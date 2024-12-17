import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import SubjectCard from "@/components/subject/subject-card";

const SearchFound = () => {};

const SearchNotFound = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Subject Not Found</h1>
        <p className="text-sm">Try to search another subject</p>
      </div>
    </>
  );
};

const StudentClassroom = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 space-y-2 p-4 pt-0">
        <Card className="flex w-full flex-col rounded-xl">
          <CardHeader>
            <h1 className="text-2xl font-bold">Halo Alif Mahendra</h1>
            <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
          </CardHeader>
          <CardFooter className="flex flex-row justify-between gap-3">
            <Input type="text" placeholder="Search Schedule" />
            <Button>Search Schedule</Button>
          </CardFooter>
        </Card>
        <div className="ml-1 space-y-2">
          <h1 className="text-xl font-bold">Monday Subject</h1>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <SubjectCard />
          </div>
        </div>
        <SearchNotFound />
      </div>
    </>
  );
};

export default StudentClassroom;
