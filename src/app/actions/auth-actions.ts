"use server";

import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import { IRequestResetPass, IResponseChangeProfile } from "@/lib/types/Types";

export const signInWithGoogle = async () => {
  await signIn("google", { redirect: true, redirectTo: "/" });
};

export async function handleCredentialsSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result && result.error) {
      return {
        success: false,
        message: result.error,
      };
    }
    return {
      success: true,
      message: "Berhasil masuk!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return {
            success: false,
            message: "Kredensial tidak valid. Silakan periksa email dan kata sandi Anda.",
          };
        default:
          return {
            success: false,
            message: "Terjadi kesalahan autentikasi yang tidak diketahui.",
          };
      }
    }
    console.error("Unexpected error during sign-in:", error);
    return {
      success: false,
      message: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.",
    };
  }
}

export async function handleRequestResetPassword(formData: FormData) {
  const entries = Object.fromEntries(formData);
  const { email } = entries;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/request-reset-pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data: IRequestResetPass = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Reset password failed");
    }

    return data as IRequestResetPass;
  } catch (error) {
    return error;
  }
}

export async function handleVerifTokenResetPass(token: string, email: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/verify-token-reset-pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        email,
      }),
    });

    const data = await response.json();

    if (response.ok && data.code === 200 && data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } else {
      throw new Error(data.error || data.message || "Token verification failed");
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

export async function changeProfilePicture(email: string, image: File) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", image);
    
    const response = await fetch(`${process.env.BACKEND_URL}/user/change-profile`, {
      method: "PUT",
      body: formData,
    });
    
    const data: IResponseChangeProfile = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Change profile picture failed");
    }
    
    return data as IResponseChangeProfile;
  } catch (error) {
    return error;
  }
}

export async function uploadAssignment(email: string, classUid: string, file: File) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("classSubjectId", classUid);
    formData.append("file", file);
    
    const response = await fetch(`${process.env.BACKEND_URL}/class/task/upload`, {
      method: "POST",
      body: formData,
    });
    
    const data: IResponseChangeProfile = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Change profile picture failed");
    }
    
    return data as IResponseChangeProfile;
  } catch (error) {
    return error;
  }
}
