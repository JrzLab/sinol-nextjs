"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const CreateClassroom = ({ status }: { status: () => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const togglePopUp = () => {
    status();
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const classroomData = {
      name: formData.get("classroom") as string,
      description: formData.get("description") as string,
    };

    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(classroomData),
    // }).then(res => res.json()).then(res => res.status == 200 ?
    //   router.push(`/classroom/${res.data.id}`) :
    //   toast({
    //     title: "Failed to create classroom",
    //     description: "gagal membuat kelas baru",
    //   })
    // )
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-foreground/50 px-6">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h1 className="font-bold">Create Classroom</h1>
                  <p className="">Buat Kelas Anda</p>
                </div>
                <Button onClick={togglePopUp}>
                  <X />
                </Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 pt-4">
                <div className="flex w-full flex-col gap-2">
                  <label className="text-sm" htmlFor="classroom">
                    Nama Kelas{" "}
                  </label>
                  <Input placeholder="Masukkan Nama Kelas" name="classroom" id="classroom" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-sm" htmlFor="description">
                    Dekskripsi Kelas{" "}
                  </label>
                  <Textarea placeholder="Masukkan Deskripsi Kelas" name="description" id="description"></Textarea>
                </div>
                <Button type="submit">Buat Kelas</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CreateClassroom;
