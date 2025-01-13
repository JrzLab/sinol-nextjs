import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { eventStaticData, subjectStaticData } from "@/lib/staticData";
// import { usePathname } from "next/navigation";
import React from "react";
import EventCard from "@/components/subject/event-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getClassByUidClassUser } from "@/app/actions/api-actions";
import { cookies } from "next/headers";

const ClassroomPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const cookie = await cookies();
  const valueCookies = cookie.get("uidClassUser");
  const subjectData = valueCookies ? await getClassByUidClassUser(valueCookies.value) : null;
  const data = subjectData?.find((data) => data.uid == slug);

  const events = eventStaticData
    .filter((data) => data.subjectId == parseInt(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <div className="relative">
        {/* <StudentChat status="online" data={subjectStaticData}>
          <BubbleChat position={"sender"} chatRoomType={"student"}>
            Hi, Selamat pagi, ada yang bisa saya bantu?
          </BubbleChat>
          <BubbleChat position={"receiver"} chatRoomType={"student"}>
            test
          </BubbleChat>
        </StudentChat> */}
      </div>
      <Card className="text-foreground">
        <CardHeader>
          <h1 className="font-bold">{data?.className}</h1>
          <p>{data?.description}</p>
          {true ? (
            <div className="flex gap-2 pt-8">
              <Link href={`/classroom/${data?.uid}/join`}>
                <Button>Ubah Kelas</Button>
              </Link>
              <Button variant={"outline"}>Lihat </Button>
            </div>
          ) : null}
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-3">
          <div className="w-full pt-6">
            <h1 className="font-bold">Teacher</h1>
            <p>{data?.ownerData.name}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Tugas</h1>
            <p>{data?.day}</p>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            {/* <Button onClick={() => setOpenEvent(!openEvent)}>Buat Tugas</Button>
            {openEvent ? <CreateEventPopUp status={() => setOpenEvent(!openEvent)} /> : null} */}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.eventId} data={event} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassroomPage;
