import { cookies } from "next/headers";
import { Card, CardHeader } from "@/components/ui/card";
import { getEventByUidClassUser, getUserData } from "@/app/actions/api-actions";
import { notFound } from "next/navigation";
import { IUserDataProps } from "@/lib/types/Types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Event = async ({ params }: { params: Promise<{ slug: string; event: string }> }) => {
  const { slug, event } = await params;
  const cookiesData = await cookies();
  const userEmail = cookiesData.get("userId");

  const dataEvent = await getEventByUidClassUser(event, slug);
  const userData: IUserDataProps | undefined = userEmail ? await getUserData(userEmail.value) : undefined;
  const filteredData = dataEvent?.find((data) => data.id === parseInt(event));

  if (!filteredData) return notFound();

  return (
    <div className="flex w-full flex-col gap-2 text-sm">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold">{filteredData.title}</h1>
          <p>{filteredData.description}</p>
        </CardHeader>
        <hr />
        <CardHeader className="flex-row items-end gap-2">
          <Avatar className="flex items-center">
            <AvatarImage width={50} height={50} className="rounded-lg" src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${userData?.imageUrl}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <h1>
              {userData?.firstName} {userData?.lastName}
            </h1>
            <p>{userData?.email}</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Event;
