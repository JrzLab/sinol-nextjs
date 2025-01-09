"use client";
import { useEffect } from "react";
import { initializeSocket, disconnectSocket } from "@/lib/socket";

export const useWebSocket = async (email: string) => {

  useEffect(() => {
    if (email) {
      initializeSocket(email);
      return () => {
        disconnectSocket();
      };
    }
  }, [email]);

  return null;
};
