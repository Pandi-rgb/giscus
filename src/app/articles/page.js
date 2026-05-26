import { prisma } from "@/lib/prisma";

import ArticleCard from "@/components/article/article-card";
import ArticleSearch from "@/components/article/article-search";

export default async function ArticlesPage({ searchParams }) {
  const search = searchParams.search || "";

  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          excerpt: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-4 text-5xl font-bold">Articles</h1>

          <p className="max-w-2xl text-muted-foreground">
            Ini adalah halaman untuk melihat semua artikel yang telah
            dipublikasikan. Kamu bisa mencari artikel berdasarkan judul atau
            kutipan singkatnya. Klik pada judul artikel untuk membaca
            selengkapnya.
          </p>
        </div>

        <ArticleSearch />
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center">
          <h2 className="mb-2 text-2xl font-semibold">No articles found</h2>

          <p className="text-muted-foreground">
            Try searching with another keyword.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
