import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import ArticleCard from "@/components/article/article-card";
import ArticleContent from "@/components/article/article-content";

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getReadingTime(content = "") {
  const words = stripHtml(content).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}

async function getArticle(slug) {
  return prisma.article.findUnique({
    where: {
      slug,
    },

    include: {
      attachment: true,
      category: true,
      tags: true,
    },
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Research Repository",
    };
  }

  const description =
    article.excerpt || stripHtml(article.content).slice(0, 155);

  return {
    title: `${article.title} | Research Repository`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: article.coverImage ? [article.coverImage] : [],
    },
    twitter: {
      card: article.coverImage ? "summary_large_image" : "summary",
      title: article.title,
      description,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedConditions = [
    article.categoryId ? { categoryId: article.categoryId } : null,
    article.tags.length
      ? {
          tags: {
            some: {
              id: {
                in: article.tags.map((tag) => tag.id),
              },
            },
          },
        }
      : null,
  ].filter(Boolean);

  const relatedArticles = await prisma.article.findMany({
    where: {
      published: true,
      id: {
        not: article.id,
      },
      ...(relatedConditions.length
        ? {
            OR: relatedConditions,
          }
        : {}),
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const fallbackArticles =
    relatedArticles.length > 0
      ? []
      : await prisma.article.findMany({
          where: {
            published: true,
            id: {
              not: article.id,
            },
          },
          include: {
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
        });

  const displayedRelatedArticles =
    relatedArticles.length > 0 ? relatedArticles : fallbackArticles;
  const readingTime = getReadingTime(article.content);

  return (
    <main className="mx-auto max-w-6xl py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          <span>{readingTime}</span>
          {article.category?.name && (
            <span className="rounded-full bg-muted px-3 py-1 text-xs">
              {article.category.name}
            </span>
          )}
        </div>

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

        {article.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

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
        <ArticleContent content={article.content} />

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
      </div>

      {displayedRelatedArticles.length > 0 && (
        <section className="mt-20 border-t pt-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 inline-flex rounded-full border px-3 py-1 text-sm">
                Related Articles
              </span>
              <h2 className="text-3xl font-bold">Continue reading</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedRelatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
