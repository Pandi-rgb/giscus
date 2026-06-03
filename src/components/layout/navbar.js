"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b fixed w-full top-0 z-50 bg-white shadow-sm">
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
            text-xl
            font-bold
          "
        >
          Research Repository
        </Link>

        {/* Desktop Menu */}
        <nav
          className="
            hidden
            items-center
            gap-6
            md:flex
          "
        >
          <Link className="hover:text-ring hover:bg-" href="/">Home</Link>

          <Link href="/articles">Articles</Link>

          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>
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
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/articles" onClick={() => setOpen(false)}>
              Articles
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
