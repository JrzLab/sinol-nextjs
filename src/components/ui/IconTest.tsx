"use client";
import { Icon } from "@iconify/react"; // Icony hanya bisa di gunakan diclient side

const IconTest = () => {
  return (
    <div className="flex w-36 items-center rounded bg-gray-400 p-1 text-red-700">
      <Icon icon="ph:house-fill" style={{ fontSize: "2rem" }} /> {/* Icon disini mengikuti warna dari text */}
      <p className="ml-2">Hello Home</p>
    </div>
  );
};

export default IconTest;
