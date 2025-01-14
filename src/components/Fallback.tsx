import { Loader2 } from "lucide-react";

const Fallback = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-4 flex items-center justify-center">
        <Loader2 width={50} height={50} color="#d4cbaa" className="animate-spin" />
      </div>
      <div className="text-xl font-semibold text-gray-700">
        Memuat
        <span className="dot-blink">.</span>
        <span className="dot-blink">.</span>
        <span className="dot-blink">.</span>
      </div>
    </div>
  );
};

export default Fallback;
