"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "../ui/breadcrumb";
import { toPascalCase } from "@/lib/functions";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const getPathname = pathname.split("/").filter((path) => path);
  const isNotFound = pathname === "/404";

  if (isNotFound) return null;
  
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {getPathname.map((path, index) => {
            const route = `/${getPathname.slice(0, index + 1).join("/")}`;
            const isLast = index === getPathname.length - 1;
            return (
              <div key={route} className="flex items-center gap-1">
                {!isLast ? (
                  <BreadcrumbItem className="hidden md:block">
                    <Link href={route}>{toPascalCase(path)}</Link>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem className="hidden md:block">
                    <Link className={isLast ? "font-bold" : ""} href="#">
                      {toPascalCase(path)}
                    </Link>
                  </BreadcrumbItem>
                )}
                <BreadcrumbSeparator className="mt-[3px] hidden md:block" />
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
