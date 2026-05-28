import "./globals.css";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Research Repository",
  description: "Digital archive for research publications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Navbar />

        <main
          className="
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {children}
        </main>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
