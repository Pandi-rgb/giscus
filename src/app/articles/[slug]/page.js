import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
    <main
      className="
    mx-auto
    max-w-4xl
    py-12
  "
    >
      {/* Date */}
      <p
        className="
      mb-4
      text-sm
      text-muted-foreground
    "
      >
        {new Date(article.createdAt).toLocaleDateString()}
      </p>

      {/* Title */}
      <h1
        className="
      mb-6
      text-3xl
      font-bold
      leading-tight
      md:text-5xl
    "
      >
        {article.title}
      </h1>

      {/* Cover */}
      {article.coverImage && (
        <Image
          src={article.coverImage}
          alt={article.title}
          width={1200}
          height={600}
          className="
        mb-10
        h-55
        w-full
        rounded-2xl
        object-cover
        md:h-105
      "
        />
      )}

      {/* Excerpt */}
      {article.excerpt && (
        <p
          className="
        mb-10
        text-lg
        leading-relaxed
        text-muted-foreground
      "
        >
          {article.excerpt}
        </p>
      )}

      {/* Content */}
      <article
        className="
      prose
      prose-lg
      max-w-none
      wrap-break-word
    "
      >
        <p>{article.content}</p>
      </article>

      {/* PDF Download */}
      {article.attachment && (
        <div
          className="
        mt-12
        rounded-2xl
        border
        bg-muted/30
        p-6
      "
        >
          <h3
            className="
          mb-2
          text-lg
          font-semibold
        "
          >
            Attached PDF
          </h3>

          <p
            className="
          mb-4
          text-sm
          text-muted-foreground
        "
          >
            Download the full document.
          </p>

          <a
            href={article.attachment.fileUrl}
            target="_blank"
            className="
          inline-flex
          rounded-xl
          bg-black
          px-5
          py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-neutral-800
        "
          >
            Download PDF
          </a>
        </div>
      )}
    </main>
  );
}
