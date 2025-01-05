import { Card, CardContent, CardFooter } from "../ui/card";

interface BubbleChatProps {
  children: React.ReactNode;
  time?: string;
  position: "sender" | "receiver"; // Position of the bubble
  backgroundColor?: string; // Customizable background color
  textColor?: string; // Customizable text color
  chatRoomType?: "teacher" | "student"; // Type of chat room
}

const BubbleChat = ({ children, time = "", position, chatRoomType }: BubbleChatProps) => {
  const isLeft = position === "sender";
  const isTeacher = chatRoomType === "teacher";
  const roundedClass = position === "sender" ? "rounded-tr-none" : "rounded-tl-none";

  return (
    <Card
      className={`${isLeft ? (isTeacher ? "ml-20" : "ml-7") : isTeacher ? "mr-20" : "mr-7"} flex flex-col gap-1 rounded-2xl ${roundedClass} bg-[#90CAF9]`}
    >
      <CardContent className="p-3">
        <p className="text-sm text-[#FFFFFF]">{children}</p>
      </CardContent>
      {time && (
        <CardFooter className="flex justify-end p-0">
          <p className="text-right text-[10px] text-[#FFFFFF]">{children}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default BubbleChat;
