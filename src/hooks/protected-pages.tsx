"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/context/AuthProvider";
import { useRouter } from "next/navigation";

interface IProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, fallback = null }) => {
  const { loading, isUnauthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isUnauthenticated) {
      router.push("/auth/sign-in");
    }
  }, [loading, isUnauthenticated, router]);

  if (loading) {
    return <>{fallback}</>;
  }

  if (isUnauthenticated) {
    return null;
  }

  return <>{children}</>;
};
