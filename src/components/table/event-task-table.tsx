"use client";

//IMPORT SHADCN COMPONENTS
import { ColumnDef } from "@tanstack/react-table";

//IMPORT INTERFACE & FUNCTION
import { IEvent, IUsersTaskTable, IViewsUser } from "@/lib/types/Types";

//IMPORT LUCIDE ICON
import DataTable from "./data-table";
import { getDate } from "@/lib/functions";

interface IEventTaskTable {
  classUsersData: IViewsUser[];
  eventData: IEvent;
}

const EventTaskTable = ({ classUsersData, eventData }: IEventTaskTable) => {
  const data: IUsersTaskTable[] =
    classUsersData?.map((doc, index) => {
      return {
        id: index + 1,
        userName: doc.name,
        userEmail: doc.email,
        userTaskScore: 0,
        userTaskStatus: "ewewe",
        userSubmittedAt: "2021-09-09",
      };
    }) || [];

  console.log(data);

  const userTaskColumns: ColumnDef<IUsersTaskTable>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
      header: () => {
        return <div className="text-center text-xs md:text-sm">No</div>;
      },
      cell: ({ row }) => <div className="text-center text-xs md:text-sm">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "userName",
      header: () => {
        return <div className="text-xs md:text-sm">Nama</div>;
      },
      cell: ({ row }) => {
        return <div className="text-xs md:text-sm">{row.getValue("userName")}</div>;
      },
    },
    {
      accessorKey: "userEmail",
      header: () => {
        return <div className="text-xs md:text-sm">Alamat Email</div>;
      },
      cell: ({ row }) => {
        return <div className="text-xs md:text-sm">{row.getValue("userEmail")}</div>;
      },
    },
    {
      accessorKey: "userTaskScore",
      header: () => {
        return <div className="text-xs md:text-sm">Nilai</div>;
      },
      cell: ({ row }) => {
        const score =
          row.getValue("userTaskScore") === 0 ? `Belum Dinilai/${eventData?.maxScore}` : `${row.getValue("userTaskScore")}/${eventData?.maxScore}`;
        return <div className="text-xs md:text-sm">{score}</div>;
      },
    },
    {
      accessorKey: "userSubmittedAt",
      header: () => <div className="text-center text-xs md:text-sm">Tanggal Pengumpulan Tugas</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("userSubmittedAt"));
        return <div className="text-center text-xs font-medium md:text-sm">{getDate({ children: date.toISOString(), time: "deactive" })}</div>;
      },
    },
    {
      accessorKey: "userTaskStatus",
      header: () => {
        return <div className="text-center text-xs md:text-sm">Status</div>;
      },
      cell: ({ row }) => {
        return <div className="text-xs md:text-sm">{row.getValue("userTaskStatus")}</div>;
      },
    },
  ];
  return <DataTable columns={userTaskColumns} data={data} filterKey="userName" />;
};

export default EventTaskTable;
