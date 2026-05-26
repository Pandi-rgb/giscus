import "./globals.css";

import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Research Repository",
  description: "Digital archive for research publications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Toaster />
      </body>
    </html>
  );
}
