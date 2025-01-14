import { io, Socket } from "socket.io-client";
import { ChatMessage, IMsgWS } from "./types/Types";

let socket: Socket | null = null;

export const initializeSocket = (clientId: string): Socket => {
  if (!clientId) {
    throw new Error("clientId is required to establish a WebSocket connection.");
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL as string, {
      query: {
        clientIdentify: clientId,
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      autoConnect: true,
      rejectUnauthorized: true,
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
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });
    socket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });
    socket.on("reconnect_failed", () => {
      console.warn("Reconnection failed");
    });
    socket.on("reconnect", (attemptNumber) => {
      console.log(`Reconnected after ${attemptNumber} attempts`);
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const sendDataMessage = (emit: string, data: IMsgWS): Promise<ChatMessage> => {
  return new Promise((resolve, reject) => {
    if (socket) {
      socket.emit(emit, data);

      socket.on("updateMessageClient", (data: ChatMessage) => {
        resolve(data);
      });

      socket.on("error", (error) => {
        reject(error);
      });
    }
  });
};
