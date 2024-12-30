import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";

declare module "next-auth" {
    interface User extends NextAuthUser {
        joinedAt: Date;
        loginAt: number;
    }
    interface Session extends DefaultSession {
        user: User;
        expires: Date; 
    }
}
