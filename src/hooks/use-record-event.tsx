"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export const useRecordEvents = (isAuthenticated: boolean) => {
  const pathname = usePathname();
  const [isEventOccurred, setIsEventOccurred] = useState(false);

  const handleClickEvent = useCallback(
    (event: MouseEvent): void => {
      if (!isAuthenticated) return;

      // Pastikan hanya memproses klik pada tombol
      if ((event.target as HTMLElement).tagName === "BUTTON" && (event.target as HTMLElement).id !== "signout") {
        setIsEventOccurred(true);

        // Reset state setelah 500ms
        setTimeout(() => setIsEventOccurred(false), 500);
      }
    },
    [isAuthenticated],
  );

  const handleScrollEvent = useCallback(() => {
    if (!isAuthenticated || pathname === '/profile') return;

    setIsEventOccurred(true);

    // Reset state setelah 500ms
    setTimeout(() => setIsEventOccurred(false), 500);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Menambahkan event listeners
    window.addEventListener("click", handleClickEvent);
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      // Menghapus event listeners saat komponen unmount
      window.removeEventListener("click", handleClickEvent);
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [isAuthenticated, handleClickEvent, handleScrollEvent]);

  return isEventOccurred;
};
