import { getClassByUidClassUser } from "@/app/actions/api-actions";
import DeleteClassButton from "@/components/button/delete-class-button";
import EditClassButton from "@/components/button/edit-class-button";
import { OpenTeacherChatButton } from "@/components/button/open-chat-button";
import OpenClassUsersButton from "@/components/button/open-class-users-button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cookies } from "next/headers";
const ClassroomLayout = async ({ params, children }: { params: { classroomId: string }; children: React.ReactNode }) => {
  const getUidCookie = (await cookies()).get("uidClassUser");
  const getUserEmailCookie = (await cookies()).get("userId");
  const { classroomId } = await params;
  const getClassData = getUidCookie ? await getClassByUidClassUser(getUidCookie.value) : null;
  const filteredClassData = getClassData?.find((data) => data.uid == classroomId);

  return (
    <>
      <Card className="text-foreground">
        <CardHeader>
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
              <h1 className="text-sm font-bold">{filteredClassData?.className}</h1>
              <p>{filteredClassData?.description}</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <OpenClassUsersButton classroomId={classroomId} /> : null}
              <OpenTeacherChatButton classroomId={classroomId} />
              {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <EditClassButton classData={filteredClassData!} /> : null}
              {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <DeleteClassButton open /> : null}
            </div>
          </div>
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-3">
          <div className="w-full pt-6">
            <h1 className="font-bold">Pengajar</h1>
            <p>{filteredClassData?.ownerData.name}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Tugas</h1>
            <p>0</p>
          </div>
        </CardFooter>
      </Card>
      {children}
    </>
  );
};

export default ClassroomLayout;
