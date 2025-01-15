"use client";

import { ChevronRight, SquareLibrary } from "lucide-react";
import { Navlink } from "./nav-class-link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IGroupClass } from "@/lib/types/Types";
import { getClassByUidClassUser, getEventByUidClassUser } from "@/app/actions/api-actions";
import { truncateText } from "@/lib/functions";
import { useRouter } from "next/navigation";

interface IEventDataProps {
  id: number;
  title: string;
  url: string;
}

export function NavMain() {
  const uidUser = Cookies.get("uidClassUser");
  const userEmail = Cookies.get("userId");
  const hasFetched = useRef(false);
  const [eventData, setEventData] = useState<Record<string, IEventDataProps[]>>({});
  const [ownerClasses, setOwnerClasses] = useState<IGroupClass[]>([]);
  const [nonOwnerClasses, setNonOwnerClasses] = useState<IGroupClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const classData = await getClassByUidClassUser(uidUser!);

        // Initializing variables for owner and non-owner classes
        const ownerClasses: IGroupClass[] = [];
        const nonOwnerClasses: IGroupClass[] = [];
        const events: Record<string, IEventDataProps[]> = {};

        // Group classes by owner and non-owner, and fetch events in parallel
        if (classData) {
          const eventPromises = classData.map(async (cls) => {
            if (cls.ownerData.email === userEmail) {
              ownerClasses.push(cls);
            } else {
              nonOwnerClasses.push(cls);
            }
            const eventList = await getEventByUidClassUser(uidUser!, cls.uid);
            events[cls.uid] = eventList?.map((event) => ({
              id: event.id,
              title: event.title,
              url: `/classroom/${cls.uid}/${event.id}`,
            })) || [];
          });

          await Promise.all(eventPromises); // Run all event fetching in parallel
        }

        setOwnerClasses(ownerClasses);
        setNonOwnerClasses(nonOwnerClasses);
        setEventData(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uidUser, userEmail]);

  console.log(subject)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Kelas</SidebarGroupLabel>
      <SidebarMenu>
        {nonOwnerClasses.map((item) => (
          <Collapsible key={item.uid} className="group">
            <CollapsibleTrigger asChild>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.className}>
                  <SquareLibrary />
                  <Navlink href={item.uid}>
                    <span className="text-xs">{truncateText(item.className, 40)}</span>
                  </Navlink>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]:rotate-90" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </CollapsibleTrigger>
            <CollapsibleContent className="gap-2 pl-6">
              {eventData[item.uid]?.map((event) => (
                <SidebarMenuItem key={event.id}>
                  <SidebarMenuButton tooltip={event.title}>
                    <div className="hover:underline" onClick={() => router.push(event.url)}>
                      <span className="text-xs">{truncateText(event.title, 20)}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )) || <p className="text-xs text-gray-500">Tidak Ada Tugas</p>}
            </CollapsibleContent>
          </Collapsible>
        ))}
        {ownerClasses.length > 0 && (
          <>
            <SidebarGroupLabel>Teacher</SidebarGroupLabel>
            {ownerClasses.map((item) => (
              <Collapsible key={item.uid} className="group">
                <CollapsibleTrigger asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.className}>
                      <SquareLibrary />
                      <Navlink href={item.uid}>
                        <span className="text-xs">{truncateText(item.className, 40)}</span>
                      </Navlink>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent className="gap-2 pl-6">
                  {eventData[item.uid]?.map((event) => (
                    <SidebarMenuItem key={event.id}>
                      <SidebarMenuButton tooltip={event.title}>
                        <div className="hover:underline" onClick={() => router.push(event.url)}>
                          <span className="text-xs">{truncateText(event.title, 20)}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )) || <p className="text-xs text-gray-500">Tidak Ada Tugas</p>}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
