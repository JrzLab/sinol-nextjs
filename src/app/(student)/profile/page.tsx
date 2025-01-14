"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/context/AuthProvider";
import { Clock, Mail, Calendar, User, Edit, Upload } from "lucide-react";
import { formatUnixTimestamp, formatDate, getInitials } from "@/lib/functions";
import ImageUploadDialog from "@/components/popup/upload-avatar";
import AccountInfoDialog from "@/components/popup/change-data";
import { changeEmailOrUsername, changeProfilePicture } from "@/app/actions/auth-actions";
import { IResponseChangeData, IResponseChangeProfile } from "@/lib/types/Types";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState<boolean>(false);
  const [loadingChange, setLoadingChange] = useState<boolean>(false);
  const { data: session, update } = useSession();

  const handleUpdateSession = async (firstName?: string, lastName?: string, email?: string) => {
    try {
      if (session?.user) {
        await update({
          name: `${firstName} ${lastName}`,
          email: email,
        });
      }
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleUpdateImage = async (image: string) => {
    try {
      if (session?.user) {
        await update({
          image,
        });
      }
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleUpload = (file: File) => {
    if (!user || !user.email) {
      toast.error("User email is not available");
      return;
    }
    toast.promise(changeProfilePicture(user.email, file), {
      loading: "Uploading your profile picture...",
      success: async (response) => {
        const typedResponse = response as IResponseChangeProfile;
        if (typedResponse.success && typedResponse.code === 200) {
          await handleUpdateImage(`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${typedResponse.data.linkProfile}`);
          return typedResponse.message;
        } else {
          throw new Error(typedResponse.message);
        }
      },
      error: (error) => {
        console.error("Error uploading profile picture:", error);
        throw error;
      },
    });
  };

  const handleAccountInfoUpdate = async (firstName: string, lastName: string, email: string, password: string) => {
    setLoadingChange(true);
    if (!user?.email) {
      toast.error("User email is not available");
      setLoadingChange(false);
      return;
    }
    toast.promise(changeEmailOrUsername(user.email, password, email, firstName, lastName), {
      loading: "Updating your information...",
      success: async (response) => {
        const typedResponse = response as IResponseChangeData;
        console.log(typedResponse);
        if (typeof response === "object" && response !== null && "success" in response && "code" in response && "message" in response) {
          if (typedResponse.success && typedResponse.code === 200) {
            await handleUpdateSession(typedResponse.data.firstName, typedResponse.data.lastName, typedResponse.data.email);
            return typedResponse.message;
          }
        }
        throw new Error(typedResponse.message);
      },
      error: (err) => {
        console.error("Error:", err);
        return err.message;
      },
      finally: () => {
        setLoadingChange(false);
      },
    });
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
                <AvatarFallback className="bg-gray-300 text-2xl font-bold">{user?.username ? getInitials(user.username) : "?"}</AvatarFallback>
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
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsAccountInfoOpen(true)}>
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
                  <p className="font-medium">{user?.loginAt ? formatUnixTimestamp(user.loginAt) : "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-sm text-gray-500">Terdaftar Pada</p>
                  <p className="font-medium">{user?.joinedAt ? formatDate(user.joinedAt) : "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-sm text-gray-500">Session Berakhir Pada</p>
                  <p className="font-medium">{user?.expiresAt ? formatDate(user.expiresAt) : "N/A"}</p>
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
                <div className="rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-sm text-gray-600">Total login</p>
                </div>
                <div className="rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">15</p>
                  <p className="text-sm text-gray-600">Total Hari</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ImageUploadDialog isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onUpload={handleUpload} />
        <AccountInfoDialog
          loading={loadingChange}
          isOpen={isAccountInfoOpen}
          onClose={() => setIsAccountInfoOpen(false)}
          onUpdate={handleAccountInfoUpdate}
          currentFirstName={user?.username?.split(" ")[0]}
          currentLastName={user?.username?.split(" ")[1]}
          currentEmail={user?.email}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
