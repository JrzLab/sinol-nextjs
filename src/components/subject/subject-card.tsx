"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";

const todaySubjectData = [
  {
    id: 1,
    title: "Dasar Dasar Pemprograman",
    teacher: "Pak SiDragon",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla soluta tempore neque ipsum deleniti nostrum dignissimos ducimus voluptas corporis. Voluptates voluptate quibusdam facilis ad quo, aperiam necessitatibus vitae accusantium rerum.",
    notifications: 1,
  },
  {
    id: 2,
    title: "Dasar Dasar Komputasi",
    teacher: "Pak Jatmiko",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla soluta tempore neque ipsum deleniti nostrum dignissimos ducimus voluptas corporis. Voluptates voluptate quibusdam facilis ad quo, aperiam necessitatibus vitae accusantium rerum.",
    notifications: 1,
  },
  {
    id: 3,
    title: "Keterampilan Interpersonal",
    teacher: "Bu Siti",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla soluta tempore neque ipsum deleniti nostrum dignissimos ducimus voluptas corporis. Voluptates voluptate quibusdam facilis ad quo, aperiam necessitatibus vitae accusantium rerum.",
    notifications: 1,
  },
];

const SubjectCard = () => {
  return (
    <>
      {todaySubjectData.map((data) => (
        <Card className="flex flex-col" key={data.id}>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-sm">{data.teacher}</p>
              </div>
              <Button className="ml-3">
                <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p>{data.description}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm font-light">1 Notifications</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default SubjectCard;
