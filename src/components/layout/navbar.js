"use client";

import Link from "next/link";
import { Home, BookOpen, User, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; // 1. Import hook untuk deteksi URL

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const pathname = usePathname(); // 2. Ambil rute halaman aktif saat ini

  // 3. Cek apakah halaman aktif saat ini adalah halaman utama ('/')
  const isHomepage = pathname === "/";

  useEffect(() => {
    // Jika BUKAN halaman utama, kita tidak perlu mendengarkan event scroll sama sekali
    if (!isHomepage) return;

    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");

      if (heroSection) {
        const halfHeroHeight = heroSection.offsetHeight / 2;
        if (window.scrollY > halfHeroHeight) {
          setIsSolid(true);
        } else {
          setIsSolid(false);
        }
      } else {
        if (window.scrollY > 400) {
          setIsSolid(true);
        } else {
          setIsSolid(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomepage]); // Jalankan ulang effect jika status halaman berubah

  // 4. Tentukan kelas Tailwind berdasarkan halaman dan status scroll
  // Jika di halaman utama: ikuti status scroll (isSolid)
  // Jika di halaman lain: langsung paksa menjadi solid dan py-3 sejak awal
  const navbarClasses = isHomepage
    ? isSolid
      ? "bg-linear-to-r from-Primary via-Secondary to-Ketiga w-full shadow-xl py-1" // Setelah scroll setengah hero di homepage
      : "bg-transparent py-5" // Sebelum scroll di homepage
    : "bg-linear-to-r from-Primary via-Secondary to-Ketiga w-full shadow-xl py-1"; // Otomatis solid di halaman selain homepage

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-500 ${navbarClasses}`}
    >
      <div
        className="
          mx-auto
          flex
          gap-6
          max-w-7xl
          items-center
          justify-between
          px-4
          py-4
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            text-slate-300
            text-xl
            font-bold
            text-shadow-xl
            shadow-white/50
          "
        >
          Pak Dekan
        </Link>

        {/* Desktop Menu */}
        <nav
          className="
            hidden
            items-center
            gap-4
            md:flex
          "
        >
          <Link
            className="hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 py-1 text-sm"
            href="/"
          >
            Home
          </Link>

          <Link
            className="hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 py-1 text-sm"
            href="/articles"
          >
            Articles
          </Link>

          <Link
            className="hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 py-1 text-sm"
            href="/about"
          >
            About
          </Link>

          <Link
            className="hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 py-1 text-sm"
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            border-t
            px-4
            py-4
            md:hidden
          "
        >
          <nav
            className="
              flex
              flex-col
              gap-4
            "
          >
            <Link
              className="items-center flex hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 text-sm"
              href="/"
              onClick={() => setOpen(false)}
            >
              <Home className="h-4 w-4 inline-block mr-2" />
              Home
            </Link>

            <Link
              className=" items-center flex hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 text-sm"
              href="/articles"
              onClick={() => setOpen(false)}
            >
              <BookOpen className="h-4 w-4 inline-block mr-2" />
              Articles
            </Link>

            <Link
              className="items-center flex hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 text-sm"
              href="/about"
              onClick={() => setOpen(false)}
            >
              <User className="h-4 w-4 inline-block mr-2" />
              About
            </Link>

            <Link
              className="items-center flex hover:bg-slate-200 hover:text-black active:border focus:border rounded-full px-4 text-sm"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="h-4 w-4 inline-block mr-2" />
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
