import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-black text-white dark:bg-black/10">
      <div className="mx-auto max-w-7xl py-8 sm:px-6">
        <div className="flex gap-4 flex-col items-center justify-between ">
          <p className="text-sm text-muted-foreground text-center">
            © {year} Research Repository. All rights reserved.
          </p>

          {/* <div className="flex items-center gap-4 text-sm">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline" href="/articles">
              Articles
            </Link>
            <Link className="hover:underline" href="/about">
              About
            </Link>
            <Link className="hover:underline" href="/contact">
              Contact
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
