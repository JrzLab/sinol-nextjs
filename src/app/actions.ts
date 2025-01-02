'use server';
import { signIn, signOut } from "@/app/auth"
import { AuthError } from "next-auth";
import { IRequestResetPass, IResetPassword, ISignUpResponse } from "@/lib/types/Types"; 

export const signInWithGoogle = async () => {
    await signIn("google", { redirect: true, redirectTo: "/" })
};

export async function handleCredentialsSignin({ email, password }: { email: string, password: string }) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    }
                default:
                    return {
                        message: 'Something went wrong.',
                    }
            }
        }
        throw error;
    }
}

export const signUpCredentials = async (formData: FormData) => {
    const entries = Object.fromEntries(formData);
    const { email, password } = entries;
    try {
        const firstName = typeof email === 'string' ? email.split("@")[0] : '';
        const response = await fetch(`${process.env.BACKEND_URL}/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                firstName
            }),
        });
        const data: ISignUpResponse = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Reset password failed");
        }
        return data as ISignUpResponse;
    } catch (error) {
        return error;
    }
}
export async function handleRequestResetPassword(formData: FormData) {
    const entries = Object.fromEntries(formData);
    const { email } = entries;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/request-reset-pass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email
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


export async function handleResetPassword(email: string, password: string, token: string | null) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                token
            }),
        });
        const data: IResetPassword = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Reset password failed");
        }
        return data as IResetPassword;
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


export async function handleSignOut() {
    await signOut({ redirectTo: "/" });
}