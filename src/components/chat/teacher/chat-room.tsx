import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChatRoomProps {
  children: React.ReactNode;
}

const ChatRoom = ({ children }: ChatRoomProps) => {
  return (
    <>
      <ScrollArea scrollHideDelay={800} className="h-screen space-y-2 p-4 pb-16">
        {children}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </>
  );
};
export default ChatRoom;
