import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (clientId: string): Socket => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL, {
        query: { 
          clientIdentify: clientId // Client identifier for connection
        },
        transports: ["websocket"], // Hanya menggunakan transport WebSocket
        reconnection: true, // Mengaktifkan fitur koneksi ulang
        reconnectionDelay: 500, // Jeda awal antara percobaan koneksi ulang (ms)
        reconnectionDelayMax: 5000, // Jeda maksimum antara percobaan koneksi ulang (ms)
        reconnectionAttempts: 5, // Jumlah maksimum percobaan koneksi ulang
        autoConnect: true, // Otomatis terhubung saat inisialisasi
        rejectUnauthorized: true, // Menolak sertifikat SSL yang tidak sah      
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