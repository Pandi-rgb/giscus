import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/article/article-card";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="mb-4 text-5xl font-bold">Articles</h1>

        <p className="max-w-2xl text-muted-foreground">
          Explore published research articles, academic works, and professional
          writings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
