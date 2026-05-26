import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Research Repository
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
