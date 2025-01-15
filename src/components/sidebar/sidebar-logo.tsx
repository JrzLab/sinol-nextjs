"use client";

import * as React from "react";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import SinolLogo from "@/components/sinol-logo";
import Link from "next/link";

const SidebarLogo = () => {
  const { open } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-start">
          <SinolLogo className={`${open ? "h-auto w-10" : "h-10 w-10"}`} />
          <Link href={"/"} className={`text-lg font-bold ${open ? "flex" : "hidden"}`}>
            Sinol
          </Link>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarLogo;
