import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const ConversationPage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Card>
          <CardHeader className="flex flex-row items-center justify-start">
            <MessageCircle size={48} className="mr-2 font-bold" />
            <h1 className="m-0 text-2xl font-semibold">Select student to start conversation</h1>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default ConversationPage;
