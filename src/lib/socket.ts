import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (clientId: string): Socket => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3002", {
        query: { 
            clientIdentify: clientId 
        },
        transports: ["websocket"],
      });
      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });
      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    }
    return socket;
};

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};