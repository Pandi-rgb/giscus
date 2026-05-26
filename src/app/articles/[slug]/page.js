import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: {
      slug,
    },

    include: {
      attachment: true,
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
        {article.attachment && (
          <div className="mt-10">
            <a
              href={article.attachment.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
          inline-flex
          rounded-lg
          bg-black
          px-6
          py-3
          text-white
        "
            >
              Download PDF
            </a>
          </div>
        )}
      </article>
    </main>
  );
}
