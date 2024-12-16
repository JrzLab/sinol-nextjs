import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import SubjectCard from "@/components/subject-card";
import AttendanceChart from "@/components/attendance-chart";

const cardData = [
  {
    title: "Total Subject",
    description: "Total Subject You Get",
    total: 20,
  },
  {
    title: "Attendance",
    description: "Submitted Attendance",
    total: 20,
  },
  {
    title: "Assignment",
    description: "Submitted Assignment",
    total: 20,
  },
  {
    title: "Rank Table",
    description: "Rank Of All User",
    total: 20,
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="flex w-full flex-col rounded-xl">
            <CardHeader>
              <h1 className="text-2xl font-bold">Halo Alif Mahendra</h1>
              <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
            </CardHeader>
            <CardFooter>
              <Button>Check Schedule</Button>
            </CardFooter>
          </Card>
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {cardData.map((data) => (
              <Card className="flex flex-row justify-between" key={data.title}>
                <CardHeader>
                  <h1 className="text-xl font-bold">{data.title}</h1>
                  <p className="text-sm">{data.description}</p>
                </CardHeader>
                <CardHeader>
                  <h1 className="text-5xl font-bold">{data.total}</h1>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="ml-1">
            <h1 className="text-xl font-bold">Attendance Persentage</h1>
            <span className="text-sm">Attendance Percentage Each Month</span>
          </div>
          <div>
            <AttendanceChart />
          </div>
          <div className="ml-1">
            <h1 className="text-xl font-bold">Today Subject</h1>
            <span className="text-sm">Senin 23 Januari 2024</span>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <SubjectCard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
