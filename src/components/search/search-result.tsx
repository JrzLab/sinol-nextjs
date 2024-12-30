"use client";
import { IConversation, IMessage, IStudent } from "@/lib/types/Types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getDate, sortStudentsByLastMessage } from "@/lib/functions";
import { useRouter } from "next/navigation";

const SearchResult = ({ classroomId, students, query }: { classroomId: string; students: IStudent[]; query: string }) => {
  const router = useRouter();
  const sortedData = students.map((student) => {
    const sortedMessages = sortStudentsByLastMessage(student.messages, "latest") as IMessage[];
    const lastMessageTime = sortedMessages.length > 0 ? sortedMessages[0].time : "No message";
    return {
      ...student,
      messages: sortedMessages.length > 0 ? sortedMessages[0].content : "No message",
      lastMessageTime,
    } as IConversation;
  });
  const searchResult = sortedData.filter((student) => student.name.toLowerCase().includes(query.toLowerCase()));
  const cardHandler = (classroomId: string, studentId: string) => {
    router.push(`/teacher/classroom/${classroomId}/chat/${studentId}`);
  };
  return (
    <>
      {searchResult.length > 0 ? (
        <>
          {searchResult.map((student) => (
            <Card
              key={student.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => {
                cardHandler(classroomId, student.id.toString());
              }}
            >
              <CardHeader className="flex flex-row items-center justify-start">
                <Avatar className="mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription className="text-xs">{student.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{student.messages}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                <CardDescription className="text-xs">{getDate({ children: student.lastMessageTime })}</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </>
      ) : (
        <>
          <CardDescription className="text-center">No result found</CardDescription>
        </>
      )}
    </>
  );
};

export default SearchResult;
