import { getClassByUidClassUser, getEventByUidClassUser } from "@/app/actions/api-actions";
import { cookies } from "next/headers";

const TeacherEventPage = async ({ params }: { params: Promise<{ classroomId: string; eventId: string }> }) => {
  const { classroomId, eventId } = await params;
  const cookie = await cookies();
  const uidCookies = cookie.get("uidClassUser")?.value;
  const userEmailCookies = cookie.get("userId")?.value;
  const getClassUserData = await getClassByUidClassUser(uidCookies!);
  const classData = getClassUserData?.find((data: { uid: string }) => data.uid === classroomId);
  const getEventData = await getEventByUidClassUser(uidCookies!, classData?.uid!);
  const eventData = getEventData?.id === parseInt(eventId) ? getEventData : null;
  return <></>;
};

export default TeacherEventPage;
