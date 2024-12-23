import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { sortStudentsByLastMessage } from "@/lib/functions";
import { IMessage, IStudent } from "@/lib/types/Types";
import BubbleChat from "../bubble-chat";

const ChatRoom = ({ conversationId, students }: { conversationId: string; students: IStudent[] }) => {
  const conversations = students.find((student) => student.id === parseInt(conversationId));
  const messages = conversations?.messages as IMessage[];
  const sortedMessages = sortStudentsByLastMessage(messages, "latest") as IMessage[];
  return (
    <>
      <ScrollArea scrollHideDelay={800}>
        <div className="h-[500px] space-y-2 p-4">
          {sortedMessages.map((message: IMessage, index) => {
            return (
              <div key={index}>
                <BubbleChat time={message.time} chatRoomType={"teacher"} userType={message.userType} message={message.content} />
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <Separator orientation="horizontal" />
      <CardFooter className="grid grid-cols-1 space-y-2 py-5">
        <Textarea placeholder="Type your message here" className="resize-y" />
        <Button variant="default" className="justify-items-end" size="default">
          Send
        </Button>
      </CardFooter>
    </>
  );
};
export default ChatRoom;
