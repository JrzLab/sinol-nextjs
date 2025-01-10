"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT VALIDATION SCHEMA
import { joinClassroomFormSchema } from "@/lib/form-validation-schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface UsernameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (username: string) => void;
  currentUsername?: string;
}

const UsernameDialog: React.FC<UsernameDialogProps> = ({ isOpen, onClose, onUpdate, currentUsername }) => {
  const { update } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>({
    defaultValues: { username: currentUsername || "" },
  });

  const onSubmit = async (data: { username: string }) => {
    onUpdate(data.username);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah Nama Pengguna</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("username", { required: true, minLength: 3 })} placeholder="Enter new username" />
          {errors.username && <p className="text-sm text-red-500">Username must be at least 3 characters</p>}
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default UsernameDialog;
