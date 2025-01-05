import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInFormSchema } from "@/lib/form-validation-schema";
import { ISignInResponse, ISignInGoogleResponse } from "@/lib/types/Types";
import { signOut } from "next-auth/react";

export const { handlers, signIn, auth } = NextAuth({
  debug: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        const parsedCredentials = signInFormSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }
        const { email, password } = parsedCredentials.data;
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/auth/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const data: ISignInResponse = await response.json();
          if (!data.success) {
            console.error("Authentication failed:", data.message);
            return null;
          }

          return {
            email: data.data.email,
            name: `${data.data.firstName} ${data.data.lastName || ""}`.trim(),
            image: data.data.imageUrl || null,
            joinedAt: new Date(data.data.joinedAt),
            loginAt: data.data.loginAt,
          };
        } catch (error) {
          console.error("Authentication error:", error instanceof Error ? error.message : String(error));
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (!token.expires) {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 20);
        token.expires = expirationDate.toISOString();
      }

      if (user && account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.joinedAt = user.joinedAt;
        token.loginAt = user.loginAt;
      }

      if (user && account?.provider === "google") {
        try {
          const userName = user.name?.replace(/\./g, " ").replace(/\d+/g, "") || "";
          const nameParts = userName.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || null;

          const payload = {
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            imageUrl: user.image || null,
          };

          const response = await fetch(`${process.env.BACKEND_URL}/auth/signin-google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Failed to sync user with Google Sign-In API.");
          }

          const data: ISignInGoogleResponse = await response.json();

          if (data.code === 200 && data.success) {
            token.email = user.email || null;
            token.name = `${firstName} ${lastName || ""}`.trim();
            token.image = user.image || null;
            token.joinedAt = new Date(data.data.joinedAt);
            token.loginAt = data.data.loginAt;
          } else {
            console.error("Google Sign-In API error:", data.message);
          }
        } catch (error) {
          console.error("Error during Google Sign-In fetch:", error instanceof Error ? error.message : String(error));
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.joinedAt = token.joinedAt as Date;
        session.user.loginAt = token.loginAt as number;

        if (token.expires && typeof token.expires === "string") {
          const expiresDate = new Date(token.expires);
          if (expiresDate < new Date()) {
            session.expires = new Date(0);
            console.log("Session has expired");
            signOut();
          } else {
            session.expires = new Date(token.expires);
          }
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 20 * 60,
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-in",
    newUser: "/auth/sign-up",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET!,
});
