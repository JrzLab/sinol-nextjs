import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./style/globals.css";

import FillterPage from "@/components/fillterPage";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SINOL",
  description: "Sinol learning app for students",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.className} antialiased`}>
          <FillterPage>{children}</FillterPage>
        </body>
      </html>
  );
}
