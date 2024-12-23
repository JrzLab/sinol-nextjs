import { Card, CardContent, CardFooter } from "../ui/card";

const SenderBubbleChat = ({ chatRoomType, message }: { chatRoomType: string; message: string }): React.ReactNode => {
  return (
    <>
      <Card className={`${chatRoomType === "teacher" ? "mr-7" : "mr-20"} flex flex-col gap-1 rounded-2xl rounded-tl-none bg-blue-500 p-3 text-white`}>
        <CardContent className="p-0">
          <p className="text-sm">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-end p-0">
          <p className="text-right text-[10px] text-white">10:00 AM</p>
        </CardFooter>
      </Card>
    </>
  );
};

const ReceiveBubbleChat = ({ chatRoomType, message }: { chatRoomType: string; message: string }): React.ReactNode => {
  return (
    <>
      <Card
        className={`${chatRoomType === "teacher" ? "ml-7" : "ml-20"} flex h-auto w-auto flex-col gap-1 rounded-2xl rounded-tr-none bg-gray-500 p-3 text-white`}
      >
        <CardContent className="p-0">
          <p className="text-sm">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-end p-0">
          <p className="text-right text-[10px] text-white">10:00 AM</p>
        </CardFooter>
      </Card>
    </>
  );
};

const BubbleChat = ({
  chatRoomType,
  userType,
  message,
  time,
}: {
  chatRoomType: "teacher" | "student";
  userType: "student" | "teacher";
  message: string;
  time?: string;
}) => {
  return (
    <>
      {userType === "student" ? (
        <div className="flex flex-row justify-start space-x-2">
          <SenderBubbleChat message={message} chatRoomType={chatRoomType} />
        </div>
      ) : (
        <div className="flex flex-row justify-end space-x-2">
          <ReceiveBubbleChat message={message} chatRoomType={chatRoomType} />
        </div>
      )}
    </>
  );
};

export default BubbleChat;
