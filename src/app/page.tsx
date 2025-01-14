import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { getToday } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import SubjectCard from "@/components/subject/subject-card";
import Link from "next/link";
import { EmptyStatePages } from "@/components/empety/empety";
import { getClassByUidClassUser, getUserData } from "./actions/api-actions";
import { cookies } from "next/headers";
import { IUserDataProps } from "@/hooks/user/use-get-user";

const cardData = [
  {
    title: "Jadwal Pelajaran",
    description: "Total Jadwal Pelajaran yang Anda Dapatkan",
    total: 20,
  },
  {
    title: "Absensi",
    description: "Absensi yang Sudah Dikirim",
    total: 20,
  },
  {
    title: "Tugas",
    description: "Tugas yang Sudah Dikirim",
    total: 20,
  },
  {
    title: "Tabel Peringkat",
    description: "Peringkat Semua Pengguna",
    total: 20,
  },
];

const DashboardPage: React.FC = async () => {
  const cookie = await cookies();
  const uidCookies = cookie.get("uidClassUser");
  const userEmail = cookie.get("userId");
  const subjectData = uidCookies ? await getClassByUidClassUser(uidCookies.value) : null;
  const userData: IUserDataProps | undefined = userEmail ? await getUserData(userEmail.value) : undefined;
  const modeNoData: boolean = subjectData?.length === 0 ? true : false;

  return (
    <>
      {modeNoData ? (
        <>
          <EmptyStatePages />
        </>
      ) : (
        <>
          <div className="flex flex-1 flex-col gap-4 pt-0">
            <Card className="flex w-full flex-col rounded-xl">
              <CardHeader>
                <h1 className="text-xl font-bold">{`Halo ${userData?.firstName} ${userData?.lastName || ""}`}</h1>
                <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
              </CardHeader>
              <CardFooter className="mt-4">
                <Button className="hover:bg-secondary" variant={"default"}>
                  <Link href="/classroom">Lihat Jadwal</Link>
                </Button>
              </CardFooter>
            </Card>
            <div className="grid auto-rows-min grid-cols-2 gap-4 lg:grid-cols-4">
              {cardData.map((data) => (
                <Card className="flex flex-col justify-between text-foreground" key={data.title}>
                  <CardHeader>
                    <h1 className="font-bold">{data.title}</h1>
                    <p className="text-sm">{data.description}</p>
                  </CardHeader>
                  <CardFooter>
                    <h1 className="text-2xl font-bold">{data.total}</h1>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="ml-1">
              <h1 className="text-xl font-bold">Jadwal Hari Ini</h1>
              <span className="text-sm">{getToday()}</span>
            </div>

            <div>
              <SubjectCard format={false} data={subjectData!} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;
