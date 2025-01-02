"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { eventStaticData } from "@/lib/staticData";
import { usePathname } from "next/navigation";
import React from "react";

const page = () => {
  const query = usePathname().split("/")[3];
  // const subject =
  const events = eventStaticData
    .filter((data) => data.eventId == parseInt(query))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  return (
    <div>
      <Card className="mb-4 text-foreground">
        <CardHeader>
          <h1 className="font-bold">{events.title}</h1>
          <p>{events.description}</p>
          <p className="-p-1">{}</p>
        </CardHeader>
        <hr />
        <CardContent className="pt-4">
          <p>{events.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
