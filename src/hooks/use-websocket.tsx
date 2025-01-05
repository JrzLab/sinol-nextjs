import { connectSocket, disconnectSocket } from "@/lib/socket";

export const useWebSocket = async (email: string) => {
  const socket = connectSocket(email);
  return socket;
};
