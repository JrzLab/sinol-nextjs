"use client";

import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = async () => {
    if (!imgRef.current) return null;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    if (!ctx) return null;

    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width/2, -canvas.height/2);

    ctx.drawImage(
      imgRef.current,
      cropX,
      cropY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], selectedImage?.name || 'cropped-image.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(croppedFile);
      }, 'image/jpeg');
    });
  };

  const handleUpload = async () => {
    if (isEditing) {
      const croppedImage = await getCroppedImg();
      if (croppedImage) {
        onUpload(croppedImage);
      }
    } else if (selectedImage) {
      onUpload(selectedImage);
    }
    handleReset();
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview("");
    setIsEditing(false);
    setScale(1);
    setRotation(0);
    setCrop({
      unit: '%',
      width: 90,
      height: 90,
      x: 5,
      y: 5
    });
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
                {isEditing ? (
                  <div className="space-y-4">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      aspect={1}
                      circularCrop>
                      <img
                        ref={imgRef}
                        src={preview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          transform: `scale(${scale}) rotate(${rotation}deg)`,
                          transition: 'transform 0.2s'
                        }}
                      />
                    </ReactCrop>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Zoom</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                          >
                            <ZoomOut className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setScale(s => Math.min(3, s + 0.1))}
                          >
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Slider
                        value={[scale]}
                        onValueChange={(value) => setScale(value[0])}
                        min={0.5}
                        max={3}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Rotate</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setRotation(r => r + 90)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image src={preview} alt="Preview" width={48} height={48} className="h-48 w-48 rounded-full object-cover" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 rounded-full bg-white"
                      onClick={() => setPreview("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
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
            {isEditing ? 'Save' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;