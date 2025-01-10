"use client";

import * as React from "react";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import SinolLogo from "../sinol-logo";

const SidebarLogo = () => {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-start">
          <SinolLogo className={`${open ? "h-auto w-10" : "h-10 w-10"}`} />
          <h1 className={`text-lg font-bold ${open ? "flex" : "hidden"}`}>Sinol</h1>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarLogo;
