import ForgotPasswordForm from "@/components/auth/forgot-password/forgot-password";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
