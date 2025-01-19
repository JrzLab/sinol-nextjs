"use client";

import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { truncateText } from "@/lib/functions";

interface IFileUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

interface IFileWithError extends File {
  error?: string;
}

const FileUploadDialog: React.FC<IFileUploadDialogProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<IFileWithError[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const VIDEO_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB in bytes
  const DEFAULT_SIZE_LIMIT = 20 * 1024 * 1024; // 20MB in bytes

  const validateFile = (file: File): IFileWithError => {
    const isVideo = file.type.startsWith("video/");
    const sizeLimit = isVideo ? VIDEO_SIZE_LIMIT : DEFAULT_SIZE_LIMIT;
    if (file.size > sizeLimit) {
      const limitInMB = sizeLimit / (1024 * 1024);
      return Object.assign(file, {
        error: `File size exceeds ${limitInMB}MB limit`,
      });
    }
    return file;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).map(validateFile);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  }, [validateFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = () => {
    const validFiles = selectedFiles.filter((file) => !file.error);
    if (validFiles.length > 0) {
      onUpload(validFiles);
      handleReset();
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    onClose();
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {selectedFiles.length > 0 && (
            <div className="max-h-60 space-y-2 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-lg border p-2 ${file.error ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                >
                  <div className="mr-2 min-w-0 flex-1">
                    <p className="truncate text-sm">{truncateText(file.name, 30)}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    {file.error && <p className="text-xs text-red-600">{file.error}</p>}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div
            className={`relative flex w-full items-center justify-center ${dragActive ? "border-primary" : "border-gray-300"}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <label
              className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 hover:border-primary ${
                dragActive ? "border-primary bg-primary/5" : "border-gray-300"
              }`}
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Drag & drop files or click to upload</span>
              <span className="mt-1 text-xs text-gray-400">Videos up to 50MB, other files up to 20MB</span>
              <input type="file" multiple className="hidden" onChange={handleFileSelect} />
            </label>
          </div>
          {selectedFiles.some((file) => file.error) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Some files exceed the size limit and will be excluded</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFiles.length || !selectedFiles.some((file) => !file.error)}>
            Upload {!!selectedFiles.filter((f) => !f.error).length} files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
