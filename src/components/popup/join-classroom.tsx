"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const JoinClassroom = ({ status }: { status: () => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const togglePopUp = () => {
    status();
    setIsOpen(!isOpen);
  };

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const classroomCode = formData.get("classCode") as string;

    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ code: classroomCode }),
    // }).then(res => res.json()).then(res => res.status == 200 ?
    //   router.push(`/classroom/${res.data.id}`) :
    //   toast({
    //     title: "Failed to join classroom",
    //     description: "Kode kelas tidak valid",
    //   })
    // )
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-foreground/50 px-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h1 className="font-bold">Join Classroom</h1>
                  <p>Masukkan Kode Kelas Anda</p>
                </div>
                <Button onClick={togglePopUp}>
                  <X />
                </Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <form onSubmit={handleJoin} className="flex w-full flex-col gap-6 pt-4">
                <div className="flex w-full flex-col gap-2">
                  <label className="text-sm" htmlFor="classroomCode">
                    Kode Kelas - <span className="font-semibold">Kode Berupa 5 Digit</span>
                  </label>
                  <Input placeholder="Masukan Kode Class" name="classroomCode" id="classroomCode" />
                </div>
                <Button type="submit">Join Class</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default JoinClassroom;
