import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChatRoomProps {
  children: React.ReactNode;
}

const ChatRoom = ({ children }: ChatRoomProps) => {
  return (
    <>
      <ScrollArea scrollHideDelay={800} className="space-y-3 p-3 md:h-[300px]">
        {children}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </>
  );
};
export default ChatRoom;
