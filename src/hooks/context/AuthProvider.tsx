"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUserData, IAuthContextProps } from "@/lib/types/Types";
import { UseWebSocket } from "@/hooks/websocket/use-websocket";
import { disconnectSocket } from "@/lib/socket";
import Cookies from "js-cookie";
import { useRecordEvents } from "../use-record-event";

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";
  const loading = status === "loading";

  useEffect(() => {
    if (session?.user.email) {
      UseWebSocket(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    const publicRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];

    const currentPath = window.location.pathname;

    if (status === "authenticated" && session?.user) {
      setUser({
        uidClassUser: session.user.uidClassUser!,
        firstName: session.user.firstName!,
        lastName: session.user.lastName!,
        email: session.user.email!,
        imageUrl: session.user.image!,
        joinedAt: session.user.joinedAt!,
        loginAt: session.user.loginAt!,
        expiresAt: session.expires!,
      });

      Cookies.set("uidClassUser", session.user.uidClassUser!);
      Cookies.set("userId", session.user.email!);

      if (publicRoutes.includes(currentPath) && currentPath !== "/auth/forgot-password") {
        router.push("/");
      }

    } else if (status === "unauthenticated" && !publicRoutes.includes(currentPath)) {
      disconnectSocket();

      Cookies.remove("userId");
      Cookies.remove("uidClassUser");

      router.push("/auth/sign-in");
    }
  }, [session, loading, status, router]);

  const isEventRecorded = useRecordEvents(isAuthenticated);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setUser, isUnauthenticated, isEventRecorded, user, status, loading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
