import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInFormSchema } from "@/lib/form-validation-schema";
import { ISignInResponse } from "@/lib/types/Types";
import { signOut } from "next-auth/react";

export const { handlers, signIn, auth } = NextAuth({
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

          const data: ISignInResponse = await response.json();

          if (!data.success) {
            if (data.message.toLowerCase() === "password not set") {
              throw new Error("Password not set");
            } else if (data.message.toLowerCase() === "invalid passowrd") {
              throw new Error("Invalid credentials");
            } else {
              console.error("Authentication failed:", data.message);
              throw new Error("Authentication failed");
            }
          }

          return {
            uidClassUser: data.data.uid,
            email: data.data.email,
            firstName: data.data.firstName,
            lastName: data.data.lastName || "",
            image: `${process.env.BACKEND_URL}${data.data.imageUrl}`.trim(),
            joinedAt: new Date(data.data.joinedAt),
            loginAt: data.data.loginAt,
          };
        } catch (error) {
          console.error("Authentication error:", error instanceof Error ? error.message : String(error));
          throw new Error("Authentication process halted");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (!token.expires) {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 20);
        token.expires = expirationDate.toISOString();
      }

      if (user && account?.provider === "credentials") {
        token.uid = user.uidClassUser;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.image = user.image!;
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

          const data: ISignInResponse = await response.json();

          if (data.code === 200 && data.success) {
            token.uid = data.data.uid;
            token.email = data.data.email;
            token.firstName = data.data.firstName;
            token.lastName = data.data.lastName || "";
            token.image = `${process.env.BACKEND_URL}${data.data.imageUrl}`.trim();
            token.joinedAt = new Date(data.data.joinedAt);
            token.loginAt = data.data.loginAt;
          } else {
            console.error("Google Sign-In API error:", data.message);
            throw new Error("Google Sign-In API error");
          }
        } catch (error) {
          console.error("Error during Google Sign-In fetch:", error instanceof Error ? error.message : String(error));
          throw new Error("Google Sign-In fetch halted");
        }
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.uidClassUser = token.uid as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.image = token.image as string;
        session.user.joinedAt = token.joinedAt as Date;
        session.user.loginAt = token.loginAt as number;

        if (token.expires && typeof token.expires === "string") {
          const expiresDate = new Date(token.expires);
          if (expiresDate < new Date()) {
            session.expires = new Date(0);
            console.log("Session has expired");
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
  },
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
});
