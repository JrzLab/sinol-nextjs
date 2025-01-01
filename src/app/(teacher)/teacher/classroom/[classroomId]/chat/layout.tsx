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
        <div className="block md:hidden">
          <CardHeader className="p-3 px-4">
            <CardTitle className="text-lg font-bold">Dasar Dasar Pemprograman Chat Room</CardTitle>
          </CardHeader>
          <Separator orientation="horizontal" />
          <ListStudent classroomId={classroomId} students={studentStaticData} />
          {children}
        </div>
        <div className="hidden md:block">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40} minSize={30}>
              <CardHeader className="p-3 px-4">
                <CardTitle className="text-lg font-bold">Dasar Dasar Pemprograman Chat Room</CardTitle>
              </CardHeader>
              <Separator orientation="horizontal" />
              <ListStudent classroomId={classroomId} students={studentStaticData} />
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden md:flex" />
            <ResizablePanel defaultSize={60} minSize={40} className="hidden md:block">
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Card>
    </>
  );
};

export default ConversationLayout;
