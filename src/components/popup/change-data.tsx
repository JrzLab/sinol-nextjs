"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface AccountInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (firstName: string, lastName: string, email: string) => void;
  currentFirstName?: string;
  currentLastName?: string;
  currentEmail?: string;
  loading: boolean;
}

const AccountInfoDialog: React.FC<AccountInfoDialogProps> = ({
  isOpen,
  onClose,
  onUpdate,
  currentFirstName,
  currentLastName,
  currentEmail,
  loading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ firstName: string; lastName: string; email: string }>({
    defaultValues: {
      firstName: currentFirstName || "",
      lastName: currentLastName || "",
      email: currentEmail || "",
    },
  });

  const onSubmit = async (data: { firstName: string; lastName: string; email: string }) => {
    onUpdate(data.firstName, data.lastName, data.email);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Name and Email</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              {...register("firstName", { required: true, minLength: 2 })}
              placeholder="First name"
              className="flex-1"
            />
            <Input
              {...register("lastName", { required: true, minLength: 2 })}
              placeholder="Last name"
              className="flex-1"
            />
          </div>
          {errors.firstName || errors.lastName ? (
            <p className="text-sm text-red-500">First and last name must be at least 2 characters</p>
          ) : null}
          <Input
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            placeholder="Enter new email"
          />
          {errors.email && <p className="text-sm text-red-500">Please enter a valid email address</p>}
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountInfoDialog;
