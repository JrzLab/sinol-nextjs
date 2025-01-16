import { DefaultSession, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

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
declare module "next-auth/jwt" {
    interface JWT {
      uid: string;
      firstName: string;
      lastName: string;
      joinedAt: Date;
      loginAt: number;
      image: string;
    }
  }