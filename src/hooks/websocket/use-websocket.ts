import { initializeSocket, disconnectSocket } from "@/lib/socket";

export const UseWebSocket = (email: string) => {
  if (email) {
    initializeSocket(email);
    return () => {
      disconnectSocket();
    };
  }
};
