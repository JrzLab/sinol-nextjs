import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInFormSchema } from "@/lib/definitions";
import { ISignInResponse } from "@/lib/types/Types";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        let user = null;
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
          user = {
            email: data.data.email,
            name: `${data.data.firstName} ${data.data.lastName || ""}`.trim(),
            image: data.data.imageUrl || "/default-avatar.png",
            joinedAt: new Date(data.data.joinedAt),
            loginAt: data.data.loginAt,
          };
        } catch (error) {
          console.error("Authentication error:", error instanceof Error ? error.message : String(error));
          return null;
        }
        if (!user) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const isEmailVerified = profile?.email_verified;
        const isGmailAccount = profile?.email?.endsWith("@gmail.com");
        if (!isEmailVerified || !isGmailAccount) {
          throw new Error(isGmailAccount ? "Only Gmail accounts are allowed." : "Email must be verified.");
        }
      }
      return true;
    },
    jwt: async ({ token, user, account, trigger, session }) => {
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 20);

      if (user && account) {
        if (account.provider === "google") {
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
              const errorDetails = await response.text();
              console.error("Error syncing with Google Sign-In API:", errorDetails);
              throw new Error("Failed to sync user with Google Sign-In API.");
            }

            const data = await response.json();

            if (data.code === 200 && data.status) {
              token.email = data.data.email;
              token.name = `${data.data.firstName} ${data.data.lastName || ""}`.trim();
              token.image = data.data.imageUrl || null;
              token.joinedAt = new Date(data.data.joinedAt);
              token.loginAt = data.data.loginAt;
              token.expires = expirationDate.toISOString();
            } else {
              console.error("Google Sign-In API error:", data.message);
            }
          } catch (error) {
            console.error("Error during Google Sign-In fetch:", error instanceof Error ? error.message : String(error));
          }
        }
        token.expires = expirationDate.toISOString();
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.joinedAt = token.joinedAt as Date;
        session.user.loginAt = token.loginAt as number;

        if (token.expires && typeof token.expires === "string") {
          const expiresDate = new Date(token.expires);
          if (expiresDate < new Date()) {
            console.log("Token has expired");
            session.expires = new Date(0);
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
