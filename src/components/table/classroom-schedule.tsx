"use client";
//IMPORT NEXTJS
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

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
import { ISubject } from "@/lib/types/Types";
import { getDate } from "@/lib/functions";

//IMPORT LUCIDE ICON
import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react";
import DeleteClassroomAlert from "../popup/delete-classroom-alert";
import DataTable from "./data-table";
import EditClassroomDetail from "../popup/edit-classroom-detail";

const ClassroomSchedule = ({ tableData }: { tableData: ISubject[] }) => {
  const classroomScheduleColumns: ColumnDef<ISubject>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
      header: () => {
        return <div className="ml-2">No</div>;
      },
      cell: ({ row }) => <div className="ml-2">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "title",
      header: () => {
        return <div>Nama Jadwal</div>;
      },
      cell: ({ row }) => {
        const title: string = (row.getValue("title") as string).replace(/\s/g, "-").toLowerCase();
        return (
          <div>
            <Link className="underline hover:font-semibold hover:text-black" href={`/teacher/classroom/${title}`}>
              {row.getValue("title")}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <div className="flex cursor-pointer gap-2 hover:text-black" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <h1>Waktu & Tanggal</h1>
            <ArrowUpDown className="my-auto h-7 w-7 md:h-4 md:w-4" />
          </div>
        );
      },
      cell: ({ row }) => <div>{getDate({ children: row.getValue("date") })}</div>,
    },
    {
      accessorKey: "event",
      header: () => <div className="text-center">Total Tugas</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("event")}</div>;
      },
    },
    {
      accessorKey: "person",
      header: () => <div className="text-center">Jumlah Siswa</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("person")}</div>;
      },
    },
    {
      accessorKey: "status",
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
        const status: string = row.getValue("status");
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
        const router = useRouter();
        const [openEdit, setOpenEdit] = useState(false);
        const [openDelete, setOpenDelete] = useState(false);
        const titleLink: string = (row.getValue("title") as string).replace(/\s/g, "-").toLowerCase();
        const data = row.original;
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
                <DropdownMenuItem onClick={() => router.push(`/teacher/classroom/${titleLink}`)}>Lihat Jadwal</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                >
                  Ubah Jadwal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenDelete(true)}>Hapus Jadwal</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteClassroomAlert open={openDelete} dialogHandler={() => setOpenDelete(false)} />
            <EditClassroomDetail data={data} open={openEdit} dialogHandler={() => setOpenEdit(false)} />
          </>
        );
      },
    },
  ];
  return <DataTable columns={classroomScheduleColumns} data={tableData} />;
};

export default ClassroomSchedule;
