import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main>
      <section className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 rounded-full border px-4 py-1 text-sm">
          Digital Research Archive
        </span>

        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Research Repository
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
          A modern digital platform for publishing, managing, and exploring
          academic research and professional works.
        </p>

        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/articles">Explore Articles</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/about">About Me</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
