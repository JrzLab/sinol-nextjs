"use client";

import * as React from "react";
import { AppWindow, AudioWaveform, BookOpen, Command, GalleryVerticalEnd, Settings2, SquareLibrary } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { subjectStaticData } from "@/lib/staticData";
import { useAuth } from "@/hooks/context/AuthProvider";

const getSubject = () => {
  const list: {title: string, url: string}[] = []
  const today = new Date().getDay()
  console.log(today)
  subjectStaticData.forEach(item => {
    if (item.day == today) {
      list.push({title: item.title, url: `/classroom/${item.id}`})
    }
  })
  return list
} 


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    // {
    //   name: "Acme Inc",
    //   logo: GalleryVerticalEnd,
    //   plan: "Enterprise",
    // },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Classroom",
      url: "/classroom",
      icon: SquareLibrary,
      isActive: true,
      items: getSubject(),
    },
    // {
    //   title: "Teacher",
    //   url: "/teacher",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  page: [
    {
      name: "Dashboard",
      url: "/",
      icon: AppWindow,
    },
    {
      name: "Classroom",
      url: "/classroom",
      icon: SquareLibrary,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const userData = {
    name: user?.username ?? '',
    email: user?.email ?? '',
    avatar: user?.imageUrl ?? '',
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.page} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}