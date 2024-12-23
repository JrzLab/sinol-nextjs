import { dateFormater } from "@/lib/functions";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { CardContent, CardDescription, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { IConversation } from "@/lib/types/Types";

const TeacherMessage = ({ message }: { message: IConversation }) => {
  const date = dateFormater(message.lastMessageTime);
  return (
    <>
      return (
      <>
        <CardContent className="flex flex-row p-3">
          <Avatar className="mr-3">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>{message.name}</CardTitle>
            <CardDescription>Reply To : {message.email}</CardDescription>
          </div>
          <div className="ml-auto flex flex-col">
            <CardDescription>{date}</CardDescription>
          </div>
        </CardContent>
        <Separator orientation="horizontal" />
        <CardContent className="min-h-[100px] p-3">
          <p>{message.messages}</p>
        </CardContent>
        <Separator orientation="horizontal" />
      </>
      );
    </>
  );
};

export default TeacherMessage;
