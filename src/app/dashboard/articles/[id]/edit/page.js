import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import EditArticleForm from "@/components/dashboard/edit-article-form";

export default async function EditArticlePage({ params }) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-20">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Edit Article</h1>

        <p className="mt-2 text-muted-foreground">
          Update your research article.
        </p>
      </div>

      <EditArticleForm article={article} />
    </main>
  );
}
