import { DefaultSession, User as NextAuthUser, } from "next-auth";

declare module "next-auth" {
    interface User extends NextAuthUser {
        uidClassUser: string;
        firstName: string
        lastName: string;
        joinedAt: Date;
        loginAt: number;
    }
    interface Session extends DefaultSession {
        user: User;
        expires: Date; 
    }
}
