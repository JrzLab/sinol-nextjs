"use client";
//IMPORT NEXTJS
import { useEffect, useState } from "react";

//IMPORT SHADCN COMPONENTS
import { ColumnDef } from "@tanstack/react-table";

//IMPORT INTERFACE & FUNCTION
import { IClassroomUsersTable, IGroupClass, IViewsUser } from "@/lib/types/Types";

//IMPORT LUCIDE ICON
import DataTable from "./data-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDate } from "@/lib/functions";
import ActionsAlert from "../popup/actions-alert";
import { leaveClassByUidClassUser } from "@/app/actions/api-actions";
import { toast } from "sonner";

const ClassroomUsers = ({ classUsersData, classData }: { classUsersData: IViewsUser[]; classData: IGroupClass }) => {
  const router = useRouter();
  const getEmail = Cookies.get("userId");
  const [usersDataTable, setUsersDataTable] = useState<IClassroomUsersTable[]>([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IClassroomUsersTable[] = classUsersData.map((doc, index) => {
          const role = doc.email === getEmail ? "Pengajar" : "Pelajar";
          return {
            id: index + 1,
            userId: doc.uid.slice(0, 8),
            userImageURL: doc.imageUrl,
            userName: doc.name,
            userEmail: doc.email,
            userJoinedAt: doc.createdAt,
            userRole: role,
          };
        });
        setUsersDataTable(data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    if (classUsersData.length > 0) {
      fetchData();
    }
  }, [classUsersData, getEmail, setUsersDataTable]);

  const kickUserFromClass = async (userName: string, userId: string) => {
    toast.promise(leaveClassByUidClassUser(classData.uid, userId), {
      loading: `Mengeluarkan ${userName} dari kelas...`,
      success: async (response) => {
        if (response?.code === 200 && response?.success) {
          return response.message;
        }
        throw new Error(response?.message);
      },
      error: (err) => {
        return err.message;
      },
      finally: () => {
        setOpenDeleteAlert(!openDeleteAlert);
        // setLoading(false);
        router.push(`/teacher/${classData.uid}/users`);
      },
    });
  };

  const classroomUsersColums: ColumnDef<IClassroomUsersTable>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
      header: () => {
        return <div className="text-center text-xs md:text-sm">No</div>;
      },
      cell: ({ row }) => <div className="text-center text-xs md:text-sm">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "userImageURL",
      header: () => {
        return <div className="text-xs md:text-sm">Foto Profil</div>;
      },
      cell: ({ row }) => {
        return (
          <div>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${row.getValue("userImageURL")}`}
                alt={`${row.getValue("userImageURL")}-alt`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
    {
      accessorKey: "userName",
      header: () => {
        return <div className="text-xs md:text-sm">Nama Pelajar</div>;
      },
      cell: ({ row }) => {
        return <div className="text-xs md:text-sm">{row.getValue("userName")}</div>;
      },
    },
    {
      accessorKey: "userEmail",
      header: () => {
        return <div className="text-xs md:text-sm">Email Pelajar</div>;
      },
      cell: ({ row }) => {
        return <div className="text-xs md:text-sm">{row.getValue("userEmail")}</div>;
      },
    },
    {
      accessorKey: "userRole",
      header: () => {
        return <div className="text-xs md:text-sm">Peran</div>;
      },
      cell: ({ row }) => {
        return <div className="text-xs md:text-sm">{row.getValue("userRole")}</div>;
      },
    },
    {
      accessorKey: "userJoinedAt",
      header: () => <div className="text-center text-xs md:text-sm">Hari/Tanggal Masuk</div>,
      cell: ({ row }) => {
        const date = new Date(`${row.getValue("userJoinedAt")}`);
        return <div className="text-center text-xs font-medium md:text-sm">{getDate({ children: date.toLocaleDateString(), time: "deactive" })}</div>;
      },
    },
    {
      accessorKey: "userId",
      header: () => {
        return <div className="text-center text-xs md:text-sm">Pilihan</div>;
      },
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
                <DropdownMenuLabel className="text-center">Pilihan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)}>
                  <LogOut />
                  Keluarkan Siswa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ActionsAlert
              alertStatus={openDeleteAlert}
              onClose={() => setOpenDeleteAlert(true)}
              onConfirm={() => kickUserFromClass(row.getValue("userName"), row.getValue("userId"))}
            />
          </>
        );
      },
    },
  ];
  return <DataTable columns={classroomUsersColums} data={usersDataTable} filterKey="userName" />;
};

export default ClassroomUsers;
