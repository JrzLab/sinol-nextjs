import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ListStudent from "@/components/chat/teacher/list-student";
import { studentStaticData } from "@/lib/staticData";

const ConversationLayout = async ({ children, params }: { children: React.ReactNode; params: { classroomId: string } }) => {
  const { classroomId } = await params;

  return (
    <>
      <Card className="min-h-screen w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={30}>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Dasar Dasar Pemprograman Chat Room</CardTitle>
            </CardHeader>
            <Separator orientation="horizontal" />
            <ListStudent classroomId={classroomId} students={studentStaticData} />
            <CardFooter />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={40}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </>
  );
};

export default ConversationLayout;
