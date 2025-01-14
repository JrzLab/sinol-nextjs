"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/context/AuthProvider";
import { useRouter } from "next/navigation";

interface IProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, fallback = null }) => {
  const { loading, isUnauthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
    if (!loading && isUnauthenticated) {
      router.push("/auth/sign-in");
    }
  }, [loading, isUnauthenticated, router]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (isUnauthenticated) {
    return null;
  }

  return <>{children}</>;
};
