import { getClassByUidClassUser, getEventByUidClassUser } from "@/app/actions/api-actions";
import DeleteClassButton from "@/components/button/delete-class-button";
import EditClassButton from "@/components/button/edit-class-button";
import { OpenTeacherChatButton } from "@/components/button/open-chat-button";
import OpenClassUsersButton from "@/components/button/open-class-users-button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { getDayByNumber } from "@/lib/functions";
import { cookies } from "next/headers";
const ClassroomLayout = async ({ params, children }: { params: { classroomId: string }; children: React.ReactNode }) => {
  const getUidCookie = (await cookies()).get("uidClassUser");
  const getUserEmailCookie = (await cookies()).get("userId");
  const { classroomId } = await params;
  const getClassData = await getClassByUidClassUser(getUidCookie?.value!);
  const filteredClassData = getClassData?.find((data) => data.uid == classroomId);
  const getEventData = await getEventByUidClassUser(getUidCookie?.value!, filteredClassData?.uid!);
  const getEventLength = getEventData?.length;

  return (
    <>
      <Card className="text-foreground">
        <CardHeader>
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{filteredClassData?.className}</h1>
              <p>{filteredClassData?.description}</p>
            </div>
            <div className="hidden flex-col gap-2 md:flex md:flex-row">
              {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <OpenClassUsersButton classroomId={classroomId} /> : null}
              <OpenTeacherChatButton classroomId={classroomId} />
              {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <EditClassButton classData={filteredClassData!} /> : null}
              {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <DeleteClassButton open /> : null}
            </div>
          </div>
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-2 md:grid-cols-4">
          <div className="w-full pt-6">
            <h1 className="font-bold">Pengajar</h1>
            <p>{filteredClassData?.ownerData.name}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Tugas</h1>
            <p>{getEventLength}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Kode Kelas</h1>
            <p>{filteredClassData?.uid}</p>
          </div>
          {!!filteredClassData?.day && (
            <div className="w-full pt-6">
              <h1 className="font-bold">Jadwal</h1>
              <p>{getDayByNumber(filteredClassData.day)}</p>
            </div>
          )}
        </CardFooter>
        <hr className="md:hidden" />
        <CardFooter className="flex flex-row items-center gap-2 py-4 md:hidden">
          {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <OpenClassUsersButton classroomId={classroomId} /> : null}
          <OpenTeacherChatButton classroomId={classroomId} />
          {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <EditClassButton classData={filteredClassData!} /> : null}
          {filteredClassData?.ownerData.email === getUserEmailCookie?.value ? <DeleteClassButton open /> : null}
        </CardFooter>
      </Card>
      {children}
    </>
  );
};

export default ClassroomLayout;
