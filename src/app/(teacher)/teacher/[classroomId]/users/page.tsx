import { getClassByUidClassUser, getUsersClassByUidClass } from "@/app/actions/api-actions";
import ClassroomUsers from "@/components/table/classroom-users";
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
        <ClassroomUsers classUsersData={classUserData} classData={classData} />
      </div>
    </>
  );
};

export default ClassroomUsersPage;
