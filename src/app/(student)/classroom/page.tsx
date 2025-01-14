"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import EducationNotFound from "../../../../public/education-404.svg";
import SearchSubjectButton from "@/components/button/search-subject-button";
import { getClassByUidClassUser } from "@/app/actions/api-actions";
import { IGroupClass } from "@/lib/types/Types";
import SubjectCard from "@/components/subject/subject-card";
import { Loader2 } from "lucide-react";

const StudentClassroom = () => {
  const [subjectData, setSubjectData] = useState<IGroupClass[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const uidClassUser = Cookies.get("uidClassUser");
      if (uidClassUser) {
        const data = await getClassByUidClassUser(uidClassUser);
        setSubjectData(data!);
      } else {
        setSubjectData([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const modeNoData: boolean = !loading && subjectData?.length === 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 width={50} height={50} className="animate-spin" />;
      </div>
    );
  }

  return (
    <>
      {modeNoData ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 space-y-2 p-4 pt-0">
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <Image src={EducationNotFound} alt="not found" className="h-48 w-48 opacity-50" />
            <h2 className="text-2xl font-semibold text-gray-600">Classroom Not Found</h2>
            <p className="text-gray-500">You haven't joined any classroom yet.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <SearchSubjectButton subjectData={subjectData as IGroupClass[]} />
          <div className="ml-1 space-y-2">
            <SubjectCard format data={subjectData!} />
          </div>
        </div>
      )}
    </>
  );
};

export default StudentClassroom;
