import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
 
export default function SignOutButton() {
    const HandleSignOut = async () => {
        await signOut({ redirectTo: "/auth/sign-in" });
    };
    return (
      <button onClick={HandleSignOut} className="flex items-center">
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </button>
    )
}