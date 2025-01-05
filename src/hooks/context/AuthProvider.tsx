"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUserData, IAuthContextProps } from "@/lib/types/Types";

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUserData | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const isAuthenticated = status === "authenticated";
    const isUnauthenticated = status === "unauthenticated";
    const loading = status === "loading";

    useEffect(() => {
        const publicRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password", "/classroom/"];
        const currentPath = window.location.pathname;
        if (status === "authenticated" && session?.user) {
            setUser({
                username: session.user.name || undefined,
                email: session.user.email || undefined,
                imageUrl: session.user.image || undefined,
                joinedAt: session.user.joinedAt || undefined,
                loginAt: session.user.loginAt || undefined,
            });
            if (publicRoutes.includes(currentPath)) {
                router.push("/");
            }
        } else if (status === "unauthenticated" && !publicRoutes.includes(currentPath)) {
            router.push("/auth/sign-in");
        }
    }, [session, loading, status, router]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isUnauthenticated, user, status, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): IAuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
