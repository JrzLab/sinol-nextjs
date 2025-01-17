import { getClassByUidClassUser, getUsersClassByUidClass } from "@/app/actions/api-actions";
import ClassroomUsers from "@/components/table/classroom-users";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const ClassroomUsersPage = async ({ params }: { params: { classroomId: string } }) => {
  const { classroomId } = await params;
  const cookie = await cookies();
  const uidCookies = cookie.get("uidClassUser")?.value;
  const getClassUserData = await getClassByUidClassUser(uidCookies!);
  const classData = getClassUserData?.find((data) => data.uid === classroomId);
  if (!classData) {
    redirect("/teacher");
  }
  const classUserData = await getUsersClassByUidClass(classData.uid);
  return (
    <>
      <div>
        <Card className="mx-auto w-full text-foreground">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl font-bold tracking-tight">List Pelajar</CardTitle>
            <CardDescription>List Pelajar yang ada didalam kelas {classData.className}</CardDescription>
          </CardHeader>
          <CardContent>
            <ClassroomUsers classUsersData={classUserData} classData={classData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ClassroomUsersPage;
