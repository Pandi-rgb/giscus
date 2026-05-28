import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

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
      <h1 className="mb-6 text-3xl md:text-5xl font-bold">{article.title}</h1>
      {article.coverImage && (
        <Image
          src={article.coverImage}
          alt={article.title}
          width={1200}
          height={600}
          className="
      mb-8
      h-96
      w-full
      rounded-2xl
      object-cover
    "
        />
      )}

      <p className="mb-8 text-muted-foreground">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>

      <article className="prose prose-neutral max-w-none wrap-break-words">
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
