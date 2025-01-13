"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./context/AuthProvider";

export const useRecordEvents = () => {
  const { isAuthenticated } = useAuth();
  const [isEventOccurred, setIsEventOccurred] = useState(false);

  const handleEvent = useCallback((event: Event): void => {
    if (!isAuthenticated) return; 

    let eventOccurred = false;
    
    if (event instanceof KeyboardEvent || event instanceof MouseEvent || event instanceof TouchEvent || event.type === "scroll" || event.type === "resize") {
      eventOccurred = true;
    }

    setIsEventOccurred(eventOccurred);

    if (eventOccurred) {
      setTimeout(() => setIsEventOccurred(false), 500);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return; 

    // Menambahkan event listeners
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("scroll", handleEvent);
    window.addEventListener("click", handleEvent);
    window.addEventListener("mouseenter", handleEvent);
    window.addEventListener("drag", handleEvent);
    window.addEventListener("resize", handleEvent);

    // Untuk touch events pada perangkat mobile
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("touchmove", handleEvent);
    window.addEventListener("touchend", handleEvent);
    window.addEventListener("touchcancel", handleEvent);

    return () => {
      // Menghapus event listeners
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("scroll", handleEvent);
      window.removeEventListener("click", handleEvent);
      window.removeEventListener("mouseenter", handleEvent);
      window.removeEventListener("drag", handleEvent);
      window.removeEventListener("resize", handleEvent);

      // Untuk touch events pada perangkat mobile
      window.removeEventListener("touchstart", handleEvent);
      window.removeEventListener("touchmove", handleEvent);
      window.removeEventListener("touchend", handleEvent);
      window.removeEventListener("touchcancel", handleEvent);
    };
  }, [isAuthenticated, handleEvent]);

  return isEventOccurred;
};
