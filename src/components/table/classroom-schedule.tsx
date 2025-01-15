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
import {  truncateText } from "@/lib/functions";

//IMPORT LUCIDE ICON
import { ArrowUpDown, MoreHorizontal, Trash2, PanelLeftOpen, Pencil } from "lucide-react";
import DeleteClassroomAlert from "../popup/delete-classroom-alert";
import DataTable from "./data-table";

import Cookies from "js-cookie";
import { getEventByUidClassUser, getUsersClassByUidClass } from "@/app/actions/api-actions";
const ClassroomSchedule = ({ subjectData }: { subjectData: IGroupClass[] }) => {
  const cookies = Cookies.get("uidClassUser");
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [jadwalDataTable, setJadwalDataTable] = useState<IJadwalKelasTable[]>([]);

  console.log(openEdit)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPromises = subjectData.map((doc) => getUsersClassByUidClass(doc.uid));
        const eventPromises = subjectData.map((doc) => getEventByUidClassUser(cookies!, doc.uid));

        const usersData = await Promise.all(userPromises);
        const eventsData = await Promise.all(eventPromises);

        const getToday = new Date().getDay();
        const data: IJadwalKelasTable[] = subjectData.map((doc, index) => ({
          id: index + 1,
          classUid: doc.uid,
          className: doc.className,
          classDay: doc.day,
          classDescription: doc.description,
          classMember: usersData[index]?.length || 0,
          classEvent: eventsData[index]?.length || 0,
          classStatus: getToday === doc.day ? "active" : "inactive",
        }));
        setJadwalDataTable(data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    if (subjectData.length > 0) {
      fetchData();
    }
  }, [subjectData, cookies, setJadwalDataTable]);

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
            <h1 className="underline hover:font-semibold hover:text-black">{row.getValue("classUid")}</h1>
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
            <Link className="underline hover:font-semibold hover:text-black" href={`/teacher/${row.getValue("classUid")}`}>
              {row.getValue("className")}
            </Link>
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
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Pilihan</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/teacher/${row.getValue("classUid")}`)}>
                  <PanelLeftOpen />
                  Lihat Kelas
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                >
                  <Pencil />
                  Ubah Kelas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                  <Trash2 />
                  Hapus Kelas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteClassroomAlert open={openDelete} dialogHandler={() => setOpenDelete(false)} />
            {/* <EditClassroomDetail data={data} open={openEdit} dialogHandler={() => setOpenEdit(false)} /> */}
          </>
        );
      },
    },
  ];
  return <DataTable columns={classroomScheduleColumns} data={jadwalDataTable} />;
};

export default ClassroomSchedule;
