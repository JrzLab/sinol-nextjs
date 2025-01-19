import { getClassByUidClassUser, getEventByUidClassUser, getUsersClassByUidClass } from "@/app/actions/api-actions";
import EventTaskTable from "@/components/table/event-task-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";

const TeacherEventPage = async ({ params }: { params: Promise<{ classroomId: string; eventId: string }> }) => {
  const { classroomId, eventId } = await params;
  const cookie = await cookies();
  const uidCookies = cookie.get("uidClassUser")?.value;
  const getClassUserData = await getClassByUidClassUser(uidCookies!);
  const classData = getClassUserData?.find((data) => data.uid === classroomId);
  const getEventData = classData ? await getEventByUidClassUser(uidCookies!, classData.uid) : [];
  const eventData = getEventData?.find((data) => data.id === parseInt(eventId));
  const getUserData = classData ? await getUsersClassByUidClass(classData.uid) : [];

  return (
    <>
      <Card className="text-foreground">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Pengumpulan Tugas</CardTitle>
        </CardHeader>
        <hr />
        <CardContent className="py-4">
          <CardDescription className="text-foreground">
            <div className="text-sm">
              <strong>Tugas : </strong>
              {eventData?.title}
            </div>
            <div className="text-sm">
              <strong>Keterangan : </strong>
              {eventData?.description}
            </div>
            <div className="text-sm">
              <strong>Maksimal Nilai : </strong>
              {eventData?.maxScore}
            </div>
            <div className="text-sm">
              <strong>Status : </strong>
              {eventData?.status === "OPEN" ? (
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Tersedia</Badge>
              ) : (
                <Badge variant={"destructive"} className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Kadaluarsa
                </Badge>
              )}
            </div>
          </CardDescription>
        </CardContent>
        <hr />
        <CardFooter>
          <EventTaskTable classUsersData={getUserData} eventData={eventData!} />
        </CardFooter>
      </Card>
    </>
  );
};

export default TeacherEventPage;
