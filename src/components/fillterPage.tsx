"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/hooks/context/AuthProvider";
import { SessionProvider } from "next-auth/react";

// SHADCN/UI IMPORT COMPONENTS
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumbs from "@/components/sidebar/breadcrumbs";
import CreateJoinPopover from "./popup/create-join-popover";
import { ProtectedRoute } from "@/hooks/protected-pages";
import Fallback from "@/components/Fallback";

export default function FillterPage({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const notShowPage = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];

  return (
    <SessionProvider>
      <AuthProvider>
        {notShowPage.includes(pathname) ? (
          <>{children}</>
        ) : (
          <ProtectedRoute fallback={<Fallback />}>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="min-h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumbs />
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </ProtectedRoute>
        )}
      </AuthProvider>
    </SessionProvider>
  );
}
