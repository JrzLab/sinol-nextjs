import { PlusCircle, UserPlus } from "lucide-react";
import { IUserData } from "@/lib/types/Types";
import EducationSVG from "../../../public/education.svg";
import { getGreeting } from "@/lib/functions";
import { Button } from "../ui/button";
import Image from "next/image";

interface EmptyStateProps {
  loading: boolean;
  user: IUserData | null;
  onCreateClass: () => void;
  onJoinClass: () => void;
}

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `;
  document.head.appendChild(style);
}

export const EmptyStatePages: React.FC<EmptyStateProps> = ({ loading, user, onCreateClass, onJoinClass }) => {
  return (
    <div className="flex flex-col items-center justify-center px-0 md:px-6">
      <div className="w-full">
        <div className="flex flex-col items-center space-y-8 p-12">
          <div className="space-y-3 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{loading ? "Loading data..." : `${getGreeting()}, ${user?.username}!`}</h2>
            <p className="text-lg text-muted-foreground">Mulailah perjalanan belajar Anda dengan membuat atau bergabung dengan kelas.   </p>
          </div>
          <div className="animate-float relative my-8">
            <Image src={EducationSVG} alt="education" width={323} height={323} className="object-cover drop-shadow-lg" priority />
          </div>
          <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
            <Button className="flex-1 gap-2 py-2 md:py-5 text-sm hover:bg-secondary" variant={"default"} onClick={onCreateClass}>
              <PlusCircle className="h-5 w-5" />
              Buat Kelas
            </Button>
            <Button className="flex-1 gap-2 py-2 md:py-5 text-sm hover:bg-secondary" variant={"default"} onClick={onJoinClass}>
              <UserPlus className="h-5 w-5" />
              Bergabung ke Kelas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
