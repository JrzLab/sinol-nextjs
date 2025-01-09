"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/context/AuthProvider";
import { Clock, Mail, Calendar, User, Edit, Upload } from "lucide-react";
import { formatUnixTimestamp, formatDate, getInitials } from "@/lib/functions";
import ImageUploadDialog from "@/components/popup/upload-avatar";
import UsernameDialog from "@/components/popup/change-username";
import { useSession } from "next-auth/react";

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const { update } = useSession();

  const handleUpload = (file: File) => {
    console.log("Uploading file:", file);
  };

  const handleUsernameUpdate = (newUsername: string) => {
    update({
      user: {
        ...user,
        name: newUsername,
      },
    }); 
    console.log("Updating username:", newUsername);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="relative mb-16">
          <div className="h-48 rounded-lg bg-primary" />
          <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 transform flex-col items-center">
            <div className="group relative">
              <Avatar className="h-32 w-32 rounded-full border-4 border-white shadow-lg">
                <AvatarImage src={user?.imageUrl} alt="Profile Image" className="rounded-full" />
                <AvatarFallback className="bg-gray-300 text-2xl font-bold">{getInitials(user?.username!)}</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                className="absolute inset-0 flex items-center justify-center rounded-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={() => setIsUploadOpen(true)}
                style={{ width: "100%", height: "100%" }}
              >
                <Upload className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">{loading ? "Loading data..." : user?.username || "Unknown User"}</h1>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsUsernameOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <p>{loading ? "Loading data..." : user?.email || "No email provided"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="transform transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-black" />
                <h2 className="text-lg font-semibold">Akun Detail</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="h-4 w-4" />
                <div>
                  <p className="text-sm text-gray-500">Terakhir Login</p>
                  <p className="font-medium">{formatUnixTimestamp(user?.loginAt!)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-sm text-gray-500">Terdaftar Pada</p>
                  <p className="font-medium">{formatDate(user?.joinedAt!)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-black" />
                <h2 className="text-lg font-semibold">Aktivitas Anda</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-sm text-gray-600">Total login</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">15</p>
                  <p className="text-sm text-gray-600">Total Hari</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ImageUploadDialog isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onUpload={handleUpload} />
        <UsernameDialog
          isOpen={isUsernameOpen}
          onClose={() => setIsUsernameOpen(false)}
          onUpdate={handleUsernameUpdate}
          currentUsername={user?.username}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
