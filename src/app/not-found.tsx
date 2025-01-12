"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-base text-muted-foreground sm:text-lg lg:text-xl">
        Oops! Halaman yang kamu cari tidak ditemukan.
      </p>
      <Button
        variant={"default"}
        className="hover:bg-accent px-4 py-2 sm:px-6 sm:py-3"
        onClick={() => router.back()}>
        Kembali
      </Button>
    </div>
  );
}
