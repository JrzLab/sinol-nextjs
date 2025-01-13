"use client";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

const InputSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch(search);
  }, [onSearch, search]);

  return (
    <>
      <Input type="text" placeholder="Cari Siswa" value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* <Button onClick={handleSearch}>Search</Button> */}
    </>
  );
};

export default InputSearch;
