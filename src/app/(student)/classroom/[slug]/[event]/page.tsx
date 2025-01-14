"use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { FileText, Grid2x2, WholeWord } from "lucide-react";
import { useParams } from "next/navigation";

const EventsPages = () => {
  const params = useParams();
  const id = params.id;
  return <>{id}</>;
};

export default EventsPages;
