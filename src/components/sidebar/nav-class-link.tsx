"use client";

import Link from "next/link";
import React from "react";

export const Navlink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <Link className="flex items-center gap-2" href={`/classroom/${href}`}>
      {children}
    </Link>
  );
};
