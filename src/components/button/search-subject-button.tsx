"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import FindSubject from "../popup/find-subject";
import { Card, CardHeader, CardFooter } from "../ui/card";
import { useAuth } from "@/hooks/context/AuthProvider";
import { IGroupClass } from "@/lib/types/Types";

const motivasi = [
  "Hari yang indah untuk mengerjakan tugasmu, hehe.",
  "Ayo, sedikit lagi tugasmu selesai! Kamu pasti bisa, semangat!",
  "Jadikan tugas ini langkah kecil menuju mimpi besarmu, kamu hebat!",
  "Hari ini adalah kesempatan emas untuk menyelesaikan tugasmu. Gas pol!",
  "Setiap tugas yang selesai adalah bukti kerja kerasmu. Semangat terus!",
  "Tugas ini cuma sementara, hasil kerjamu akan bertahan selamanya. Yuk, lanjutkan!",
  "Waktunya bikin dirimu bangga dengan menyelesaikan tugas ini. You got this!",
  "Kerjakan tugas dengan senyum, hasilnya pasti lebih memuaskan!",
  "Ingat, hasil terbaik selalu datang dari usaha terbaik. Kamu pasti bisa!",
  "Satu tugas selesai, satu langkah lebih dekat ke tujuanmu. Keep it up!",
];

const SearchSubjectButton = ({ subjectData }: { subjectData: IGroupClass[] }) => {
  const { loading, user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <>
      <Card className="flex w-full flex-col rounded-xl text-foreground">
        <CardHeader>
          <h1 className="text-2xl font-bold">{loading ? "loading data..." : `Halo ${user?.username}`}</h1>
          <p className="mt-1">{motivasi[Math.floor(Math.random() * motivasi.length)]}</p>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => setIsOpen(true)} variant={"default"} className="hover:bg-secondary">
            Cari Jadwal
          </Button>
        </CardFooter>
      </Card>
      {isOpen && <FindSubject status={() => setIsOpen(false)} subjectData={subjectData} />}
    </>
  );
};

export default SearchSubjectButton;
