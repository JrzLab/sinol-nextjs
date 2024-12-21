"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
  const query = usePathname().split("/")[3];
  return <div>{query}</div>;
};

export default Page;
