"use client";
//IMPORT NEXT.JS HOOKS
import { useRouter } from "next/navigation";

//IMPORT SHADCN COMPONENTS
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//IMPORT FUNCTIONS
import { getDate, truncateText } from "@/lib/functions";

//IMPORT TYPES
import { IConversation } from "@/lib/types/Types";

interface UserChatCardProps {
  student: IConversation;
  classroomId: string;
}

const UserChatCard = ({ student, classroomId }: UserChatCardProps) => {
  const router = useRouter();
  const cardHandler = (classroomId: string, studentId: string) => {
    router.push(`/teacher/classroom/${classroomId}/chat/${studentId}`);
  };
  return (
    <Card
      key={student.id}
      className="cursor-pointer text-foreground hover:bg-gray-100"
      onClick={() => {
        cardHandler(classroomId, student.id.toString());
      }}
    >
      <CardHeader className="flex flex-row items-center justify-start pb-2">
        <Avatar className="mr-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <CardTitle>{student.name}</CardTitle>
          <CardDescription className="text-xs">{student.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="text-sm">{truncateText(student.messages, 50)}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <CardDescription className="text-xs">{getDate({ children: student.lastMessageTime })}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default UserChatCard;
