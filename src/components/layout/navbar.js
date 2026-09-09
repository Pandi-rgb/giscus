"use client";

import Image from "next/image";
import logo from "@/../public/LOGO_HITAM.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  BookOpen,
  User,
  MessageCircle,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", exact: true, icon: Home },
  { href: "/articles", label: "Articles", icon: BookOpen },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  useEffect(() => {
    if (!isHomepage) {
      setIsSolid(true);
      return;
    }

    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");

      if (heroSection) {
        const halfHeroHeight = heroSection.offsetHeight / 3;
        setIsSolid(window.scrollY > halfHeroHeight);
      } else {
        setIsSolid(window.scrollY > 150);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomepage]);

  const navbarClasses = isHomepage
    ? isSolid
      ? "bg-gradient-to-r from-Primary via-Secondary to-Ketiga shadow-xl py-2"
      : "bg-transparent py-4"
    : "bg-gradient-to-r from-Primary via-Secondary to-Ketiga shadow-xl py-2";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${navbarClasses}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={logo}
            alt="Posisi 21 Media"
            className="h-9 md:h-11 w-auto object-contain transition group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition",
                  isActive
                    ? "bg-white/20 text-white font-semibold shadow-xs backdrop-blur-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/dashboard"
            className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur-sm transition hover:bg-cyan-400 hover:text-slate-950"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          className="rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="border-t border-white/10 bg-gradient-to-b from-Secondary to-Ketiga px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-white/20 text-white font-semibold"
                      : "text-slate-200 hover:bg-white/10",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-2 border-t border-white/10 pt-3">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-cyan-500/20 px-4 py-2.5 text-sm font-semibold text-cyan-200"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard Admin
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
