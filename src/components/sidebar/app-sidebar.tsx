"use client";

import * as React from "react";
import { AppWindow, SquareLibrary } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import SidebarLogo from "@/components/sidebar/sidebar-logo";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/context/AuthProvider";

const data = {
  navMain: [
    {
      title: "Kelas",
      url: "/classroom",
      icon: SquareLibrary,
      isActive: true,
      items: [
        {
          title: "Kelas 1",
          url: "/classroom/1",
        },
        {
          title: "Kelas 2",
          url: "/classroom/2",
        },
        {
          title: "Kelas 3",
          url: "/classroom/3",
        },
      ],
    },
  ],
  page: [
    {
      name: "Halaman Utama",
      url: "/",
      icon: AppWindow,
    },
    {
      name: "Kelas",
      url: "/classroom",
      icon: SquareLibrary,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const userData = {
    name: user?.username ?? "",
    email: user?.email ?? "",
    avatar: user?.imageUrl ?? "",
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects projects={data.page} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
