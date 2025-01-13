import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { IGroupClass } from "@/lib/types/Types";

const FindSubject = ({ status, subjectData }: { status: () => void; subjectData: IGroupClass[] }) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<IGroupClass[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const filteredData = subjectData.filter((item) => item.className.toLowerCase().includes(search.toLowerCase()));
    setResult(filteredData);
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const togglePopUp = () => {
    status();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-foreground/50">
          <Card className="w-full max-w-xl text-foreground">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-lg font-bold">Cari Jadwal</h1>
                  <p className="text-sm">Cari Jadwal Pelajaran Kamu</p>
                </div>
                <Button onClick={togglePopUp} variant={"default"} className="hover:bg-secondary">
                  <X />
                </Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <form action="" className="flex w-full gap-2 pt-4">
                <Input name="find" value={search} onChange={handleSearch} placeholder="Cari Jadwal" />
              </form>
              <div className="remove-sb mt-4 grid max-h-80 grid-cols-1 gap-2 overflow-auto">
                {result.map((item, index) => (
                  <Link href={`/classroom/${item.uid}`} key={index} className="rounded-md border border-input p-2">
                    <div className="p-4">
                      <p className="font-bold hover:underline">{item.className}</p>
                      <p className="text-sm">{item.ownerData.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FindSubject;
