import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/article/article-card";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const featuredArticles = await prisma.article.findMany({
    where: {
      published: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <main>
      <section className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 rounded-full border px-4 py-1 text-sm">
          Digital Research Archive
        </span>

        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
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

      <section className="border-y bg-muted/30">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div>
            <span className="mb-3 inline-flex rounded-full border bg-white px-3 py-1 text-sm">
              Profile Summary
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              A focused archive for academic work and professional research.
            </h2>
          </div>

          <div className="space-y-5 text-muted-foreground">
            <p>
              This repository presents research articles, publication notes,
              and supporting documents in one accessible place. It is designed
              for readers who need to scan topics quickly, open full articles,
              and download research files without friction.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border-l pl-4">
                <div className="text-2xl font-bold text-black">
                  {featuredArticles.length}
                </div>
                <p className="text-sm">recent highlights</p>
              </div>
              <div className="border-l pl-4">
                <div className="text-2xl font-bold text-black">PDF</div>
                <p className="text-sm">document access</p>
              </div>
              <div className="border-l pl-4">
                <div className="text-2xl font-bold text-black">Open</div>
                <p className="text-sm">public reading flow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 inline-flex rounded-full border px-3 py-1 text-sm">
              Featured Research
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Latest published articles
            </h2>
          </div>

          <Button variant="outline" asChild>
            <Link href="/articles">View all articles</Link>
          </Button>
        </div>

        {featuredArticles.length === 0 ? (
          <div className="rounded-2xl border p-10 text-center">
            <h3 className="mb-2 text-2xl font-semibold">
              No featured articles yet
            </h3>
            <p className="text-muted-foreground">
              Published articles will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
