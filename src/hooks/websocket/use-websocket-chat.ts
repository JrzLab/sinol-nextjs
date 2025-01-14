import { sendDataMessage } from "@/lib/socket";

export const UseWebSocketChat = (emailOwnerClass: string, emailUserClass: string, messages: string, idRoom: number) => {
  if (emailOwnerClass && emailUserClass && messages) {
    const message = {
      identifySender: emailUserClass,
      identifyReciver: emailOwnerClass,
      message: messages,
      idRoom: `${idRoom}`,
    };
    return sendDataMessage("sendMessage", message);
  }
};
