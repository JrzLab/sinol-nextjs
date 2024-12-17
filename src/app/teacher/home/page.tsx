'use client'

import { ActivityChart } from "@/app/chart/ActivityChart"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export default function Page() {

  const [ subjectDatas, setSubjectDatas ] = useState<Subject[]>([])

  interface Subject {
    uid: string;
    name: string;
    desc: string;
    person: number;
  }

  const subjects: Subject[] = [
    {
      uid: "hbficebbfwipegf",
      name: "Matematika",
      desc: "lorem ipsum dolor sit amet",
      person: 32,
    },
    {
      uid: "abcdef123456",
      name: "Fisika",
      desc: "consectetur adipiscing elit",
      person: 28,
    },
    {
      uid: "xyz7890mnopq",
      name: "Kimia",
      desc: "sed do eiusmod tempor incididunt",
      person: 20,
    },
    {
      uid: "uvw54321qwert",
      name: "Biologi",
      desc: "ut labore et dolore magna aliqua",
      person: 25,
    },
  ];

  useEffect(() => {
    setSubjectDatas(subjects)
  }, [])

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
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
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
          <Card className="w-full rounded-xl flex flex-col">
            <CardHeader>
              <h1 className="text-xl font-bold">Halo Alif Mahendra</h1>
              <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
            </CardHeader>
            <CardFooter>
              <Button>
                Njay
              </Button>
            </CardFooter>
          </Card>
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            { subjectDatas.map((data) => (
            <Card key={data.uid}>
              <CardHeader className="mt-8 p-4">
                <h1 className="font-medium -mb-2 text-xl">{data.name}</h1>
                <p className="text-sm">{data.desc}</p>
              </CardHeader>
              <hr />
              <CardFooter className="gap-2 flex p-4">
                <Button>Detail</Button>
                <Button variant={"outline"}>Delete Class</Button>
              </CardFooter>
            </Card>
            ))}
          </div>
          <div className="w-full">
            <ActivityChart/>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
