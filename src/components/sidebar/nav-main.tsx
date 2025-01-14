"use client";

import { ChevronRight, SquareLibrary } from "lucide-react";
import { Navlink } from "./nav-class-link";

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
      return data;
    };
    getSubject()
  }, [setSubject, setNavClassData, setEvent, uidUser]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Kelas</SidebarGroupLabel>
      <SidebarMenu>
        {subject.map((item, index) => (
          <Collapsible key={index} asChild className="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.className}>
                <SquareLibrary />
                <Navlink href={item.uid}>
                  <span className="text-xs">{truncateText(item.className, 40)}</span>
                </Navlink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
