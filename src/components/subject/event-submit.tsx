import React from "react";
import { Card, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

const EventSubmit = () => {
  return (
    <>
      <form>
        <Card>
          <CardHeader className="items-center">
            <h1 className="text-lg">
              <b>Pengumpulan tugas</b>
            </h1>
            <p>kumpulkan tugas event ini</p>
          </CardHeader>
          <hr />
          <CardHeader>
            <Input type="file" className="mt-4" />
          </CardHeader>
        </Card>
      </form>
    </>
  );
};

export default EventSubmit;
