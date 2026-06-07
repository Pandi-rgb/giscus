import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import EditArticleForm from "@/components/dashboard/edit-article-form";

export default async function EditArticlePage({ params }) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      attachment: true,
      tags: true,
    },
  });

  if (!article) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="container mx-auto max-w-3xl px-4 py-20">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Edit Artikel</h1>

        <p className="mt-2 text-muted-foreground">
          Update artikel Anda.
        </p>
      </div>

      <EditArticleForm article={article} categories={categories} />
    </main>
  );
}
