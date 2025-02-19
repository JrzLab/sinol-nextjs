import { Card, CardHeader } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const ConversationPage = () => {
  return (
    <>
      <div className="hidden h-[460px] flex-col items-center justify-center md:flex">
        <Card className="p-1">
          <CardHeader className="my-auto flex flex-row items-center justify-start align-middle">
            <MessageCircle className="mr-2 mt-1 font-bold" />
            <h1 className="text-lg font-semibold">Pilih pengguna untuk melakukan diskusi!</h1>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default ConversationPage;
