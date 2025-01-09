"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";


interface ImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      onUpload(selectedImage);
      handleReset();
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex w-full items-center justify-center">
            {preview ? (
              <div className="relative">
                <Image src={preview} alt="Preview" width={48} height={48} className="h-48 w-48 rounded-full object-cover" />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 rounded-full bg-white" onClick={() => setPreview("")}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-primary">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Click to upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageSelect} />
              </label>
            )}
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedImage}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
