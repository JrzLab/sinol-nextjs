import Image from "next/image";
import EducationNotFound from "../../../../public/education-404.svg";
import SearchSubjectButton from "@/components/button/search-subject-button";
import { getClassByUidClassUser } from "@/app/actions/api-actions";
import { cookies } from "next/headers";

const StudentClassroom = async () => {
  const cookie = await cookies()
  const valueCookies = cookie.get('uidClassUser');
  const data = valueCookies ? await getClassByUidClassUser(valueCookies.value) : null;
  const modeNoData = false;

  return (
    <>
      {modeNoData ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 space-y-2 p-4 pt-0">
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <Image src={EducationNotFound} alt="not found" className="h-48 w-48 opacity-50" />
            <h2 className="text-2xl font-semibold text-gray-600">Classroom Not Found</h2>
            <p className="text-gray-500">You havent joined any classroom yet.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <SearchSubjectButton />
          <div className="ml-1 space-y-2">
            {/* <SubjectCard format /> */}
            {JSON.stringify(data)}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentClassroom;
