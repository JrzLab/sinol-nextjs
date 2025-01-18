"use client";
//IMPORT NEXTJS
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

//IMPORT SHADCN COMPONENTS
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

//IMPORT INTERFACE & FUNCTION
import { IGroupClass, IJadwalKelasTable } from "@/lib/types/Types";
import { truncateText } from "@/lib/functions";

//IMPORT LUCIDE ICON
import { ArrowUpDown, MoreHorizontal, Trash2, PanelLeftOpen } from "lucide-react";
import DataTable from "./data-table";

import Cookies from "js-cookie";
import { getEventByUidClassUser, getUsersClassByUidClass } from "@/app/actions/api-actions";
import ActionsAlert from "../popup/actions-alert";
import { toast } from "sonner";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const ClassroomSchedule = ({ subjectData }: { subjectData: IGroupClass[] }) => {
  const cookies = Cookies.get("uidClassUser");
  const router = useRouter();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [jadwalDataTable, setJadwalDataTable] = useState<IJadwalKelasTable[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPromises = subjectData.map((doc) => getUsersClassByUidClass(doc.uid));
        const eventPromises = subjectData.map((doc) => getEventByUidClassUser(cookies!, doc.uid));

        const usersData = await Promise.all(userPromises);
        const eventsData = await Promise.all(eventPromises);

        const getToday = new Date().getDay();

        const data: IJadwalKelasTable[] = subjectData.map((doc, index) => {
          return {
            id: index + 1,
            classUid: doc.uid,
            className: doc.className,
            classDay: doc.day,
            classDescription: doc.description,
            classMember: usersData[index]?.length || 0,
            classEvent: eventsData[index]?.length || 0,
            classStatus: getToday === doc.day ? "active" : "inactive",
          };
        });
        setJadwalDataTable(data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    if (subjectData.length > 0) {
      fetchData();
    }
  }, [subjectData, cookies, setJadwalDataTable]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kode kelas berhasil disalin");
  };

  const classroomScheduleColumns: ColumnDef<IJadwalKelasTable>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
      header: () => {
        return <div className="ml-2">No</div>;
      },
      cell: ({ row }) => <div className="ml-2">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "classUid",
      header: () => {
        return <div>Kode Kelas</div>;
      },
      cell: ({ row }) => {
        return (
          <div>
            <h1
              className="underline hover:cursor-pointer hover:font-semibold hover:text-black"
              onClick={() => copyToClipboard(row.getValue("classUid"))}
            >
              {row.getValue("classUid")}
            </h1>
          </div>
        );
      },
    },
    {
      accessorKey: "className",
      header: () => {
        return <div>Nama Kelas</div>;
      },
      cell: ({ row }) => {
        return (
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link className="underline hover:font-semibold hover:text-black" href={`/teacher/${row.getValue("classUid")}`}>
                  {row.getValue("className")}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-[#FFFDF6]" align="start">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{row.getValue("className")}</h4>
                    <p className="text-sm">{truncateText(row.getValue("classDescription"), 30)}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        );
      },
    },
    {
      accessorKey: "classDay",
      header: ({ column }) => {
        return (
          <div className="flex cursor-pointer gap-2 hover:text-black" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <h1>Hari</h1>
            <ArrowUpDown className="my-auto h-7 w-7 md:h-4 md:w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        let day;
        switch (row.getValue("classDay")) {
          case 1:
            day = "Senin";
            break;
          case 2:
            day = "Selasa";
            break;
          case 3:
            day = "Rabu";
            break;
          case 4:
            day = "Kamis";
            break;
          case 5:
            day = "Jumat";
            break;
          case 6:
            day = "Sabtu";
            break;
          case 7:
            day = "Minggu";
            break;
        }
        return <div>{day}</div>;
      },
    },
    {
      accessorKey: "classDescription",
      header: () => <div className="text-center">Deskripsi Kelas</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{truncateText(row.getValue("classDescription"), 20)}</div>;
      },
    },
    {
      accessorKey: "classEvent",
      header: () => <div className="text-center">Total Tugas</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("classEvent")}</div>;
      },
    },
    {
      accessorKey: "classMember",
      header: () => <div className="text-center">Jumlah Siswa</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("classMember")}</div>;
      },
    },
    {
      accessorKey: "classStatus",
      header: ({ column }) => {
        return (
          <div
            className="flex cursor-pointer justify-center gap-2 hover:text-black"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <h1>Status Kelas</h1>
            <ArrowUpDown className="my-auto h-7 w-7 md:h-4 md:w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        const status: string = row.getValue("classStatus");
        return (
          <div className="flex items-center justify-center gap-2">
            {status === "active" ? (
              <>
                <div className="h-2 w-2 rounded-full bg-green-700" />
                <h1 className="text-sm">Berjalan</h1>
              </>
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-red-700" />
                <h1 className="text-sm">Tidak Berjalan</h1>
              </>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Pilihan</div>,
      cell: ({ row }) => {
        return (
          <>
            <DropdownMenu defaultOpen={false} modal={false}>
              <DropdownMenuTrigger className="mx-auto flex" asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#FFFDF6]">
                <DropdownMenuLabel>Pilihan</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/teacher/${row.getValue("classUid")}`)}>
                  <PanelLeftOpen />
                  Lihat Kelas
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                >
                  <Pencil />
                  Ubah Kelas
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)}>
                  <Trash2 />
                  Hapus Kelas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ActionsAlert alertStatus={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)} />
            {/* <DeleteClassroomAlert open={openDelete} dialogHandler={() => deleteClassroom(row.getValue("classUid"))} /> */}
            {/* <EditClassroomDetail data={data} open={openEdit} dialogHandler={() => setOpenEdit(false)} /> */}
          </>
        );
      },
    },
  ];
  return <DataTable columns={classroomScheduleColumns} data={jadwalDataTable} filterKey="className" />;
};

export default ClassroomSchedule;
