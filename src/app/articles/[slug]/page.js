import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-20">
      <h1 className="mb-6 text-5xl font-bold">{article.title}</h1>

      <p className="mb-8 text-muted-foreground">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>

      <article className="prose prose-neutral max-w-none">
        <p>{article.content}</p>
      </article>
    </main>
  );
}
