import { sendDataMessage } from "@/lib/socket";

export const UseWebSocketChat = (email1: string, email2: string, messages: string, idRoom: number) => {
  if (email1 && email2 && messages) {
    const message = {
      identifySender: email2,
      identifyReciver: email1,
      message: messages,
      idRoom: `${idRoom}`,
    };
    sendDataMessage("sendMessage", message);
  }
};
