import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t min-w-screen bg-slate-700 py-10">
      <div className="container mx-auto px-4 text-center text-sm text-slate-300">
        © {year} Research Repository. All rights reserved.
      </div>
    </footer>
  );
}
