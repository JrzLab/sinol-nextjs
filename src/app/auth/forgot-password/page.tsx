import ForgotPasswordForm from "@/components/auth/forgot-password/forgot-password";
import { Suspense } from "react";

const ForgotPassword = () => {
  return (
    <Suspense>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default ForgotPassword;
