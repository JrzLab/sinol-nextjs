"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toPascalCase } from "@/lib/functions";
import Link from "next/link";
import { getLocalStorage } from "@/hooks/use-get-localstorage";
import { IGroupClass, IEvent } from "@/lib/types/Types";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);
  const isNotFound = pathname === "/404";

  if (isNotFound) return null;

  const classroom: IGroupClass[] = getLocalStorage<IGroupClass>("class") || [];
  const event: IEvent[] = getLocalStorage<IEvent>("event") || [];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const route = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          const isClassroom = classroom.find((cls) => cls?.uid === path);
          const isEvent = event.find((eve) => eve?.id === parseInt(path));

          return (
            <div key={route} className="flex items-center gap-1">
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <span className="font-bold">{isClassroom ? isClassroom.className : isEvent ? isEvent.title : toPascalCase(path)}</span>
                ) : (
                  <Link href={route}>{isClassroom ? isClassroom.className : isEvent ? isEvent.title : toPascalCase(path)}</Link>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="mt-[3px] hidden md:block" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
