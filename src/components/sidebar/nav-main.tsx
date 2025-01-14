"use client";

import { ChevronRight, SquareLibrary } from "lucide-react";
import Link from "next/link";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IEvent, IGroupClass } from "@/lib/types/Types";
import { getClassByUidClassUser, getEventByUidClassUser } from "@/app/actions/api-actions";
import { truncateText } from "@/lib/functions";

interface IEventDataProps {
  id: number;
  title: string;
  url: string;
}

interface IClassNavbarData {
  classUid: string;
  title: string;
  events: IEventDataProps[];
}

export function NavMain() {
  const uidUser = Cookies.get("uidClassUser");
  const hasFetched = useRef(false);
  const [subject, setSubject] = useState<IGroupClass[]>([]);
  const [event, setEvent] = useState<IEvent[]>([]);
  const [navClassData, setNavClassData] = useState<IClassNavbarData[]>([]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const getSubject = async () => {
      const data = await getClassByUidClassUser(uidUser!);
      setSubject(data!);
      return data!;
    };
    getSubject().then((data) => {
      data.map(async (item) => {
        const eventData = await getEventByUidClassUser(uidUser!, "fe612ce0");

        setNavClassData((prev) => [
          ...prev,
          {
            classUid: item.uid,
            title: item.className,
            events: [],
          },
        ]);
      });
    });
  }, [setSubject, setNavClassData, setEvent, uidUser]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Kelas</SidebarGroupLabel>
      <SidebarMenu>
        {subject.map((item, index) => (
          <Collapsible key={index} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.className}>
                  <SquareLibrary />
                  <span className="text-xs">{truncateText(item.className, 40)}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {event.map(async (subItem, index) => {
                    return (
                      <>
                        <SidebarMenuSubItem key={index}>
                          <SidebarMenuSubButton asChild>
                            <Link href={`/classroom/${item.uid}/${subItem.id}`}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
