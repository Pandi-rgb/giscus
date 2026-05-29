import { prisma } from "@/lib/prisma";

import ArticleCard from "@/components/article/article-card";
import ArticleSearch from "@/components/article/article-search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { absoluteUrl, createMetadata } from "@/lib/seo";

const ARTICLES_PER_PAGE = 6;

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const search = getParamValue(resolvedSearchParams.q);
  const category = getParamValue(resolvedSearchParams.category);
  const tag = getParamValue(resolvedSearchParams.tag);
  const page = getParamValue(resolvedSearchParams.page);

  const params = new URLSearchParams();

  if (search) params.set("q", search);
  if (category) params.set("category", category);
  if (tag) params.set("tag", tag);
  if (page) params.set("page", page);

  const path = params.toString() ? `/articles?${params}` : "/articles";
  const title = search ? `Articles matching "${search}"` : "Articles";
  const description =
    "Browse published research articles, filter by category or tag, and download supporting research documents.";

  return createMetadata({
    title,
    description,
    path,
  });
}

function getParamValue(value, fallback = "") {
  if (Array.isArray(value)) {
    return value[0] || fallback;
  }

  return value || fallback;
}

function getArticleOrderBy(sort) {
  if (sort === "oldest") {
    return { createdAt: "asc" };
  }

  if (sort === "title") {
    return { title: "asc" };
  }

  return { createdAt: "desc" };
}

function createPageHref(searchParams, page) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    const paramValue = getParamValue(value);

    if (paramValue && key !== "page") {
      params.set(key, paramValue);
    }
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/articles?${queryString}` : "/articles";
}

function Pagination({ currentPage, totalPages, searchParams }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Articles pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <Button variant="outline" asChild>
        <Link
          aria-disabled={currentPage === 1}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          href={createPageHref(searchParams, Math.max(currentPage - 1, 1))}
          tabIndex={currentPage === 1 ? -1 : undefined}
        >
          Previous
        </Link>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          asChild
        >
          <Link
            aria-current={page === currentPage ? "page" : undefined}
            href={createPageHref(searchParams, page)}
          >
            {page}
          </Link>
        </Button>
      ))}

      <Button variant="outline" asChild>
        <Link
          aria-disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }
          href={createPageHref(
            searchParams,
            Math.min(currentPage + 1, totalPages),
          )}
          tabIndex={currentPage === totalPages ? -1 : undefined}
        >
          Next
        </Link>
      </Button>
    </nav>
  );
}

export default async function ArticlesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const search = getParamValue(resolvedSearchParams.q);
  const categorySlug = getParamValue(resolvedSearchParams.category);
  const tagSlug = getParamValue(resolvedSearchParams.tag);
  const sort = getParamValue(resolvedSearchParams.sort, "newest");
  const requestedPage = Number(getParamValue(resolvedSearchParams.page, "1"));
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const where = {
    published: true,
    ...(categorySlug
      ? {
          category: {
            slug: categorySlug,
          },
        }
      : {}),
    ...(tagSlug
      ? {
          tags: {
            some: {
              slug: tagSlug,
            },
          },
        }
      : {}),
    ...(search
      ? {
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

            {
              content: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };

  const [categories, tags, totalArticles, articles] = await prisma.$transaction([
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.article.count({
      where,
    }),
    prisma.article.findMany({
      where,
      include: {
        category: true,
        tags: true,
      },
      orderBy: getArticleOrderBy(sort),
      skip: (currentPage - 1) * ARTICLES_PER_PAGE,
      take: ARTICLES_PER_PAGE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalArticles / ARTICLES_PER_PAGE));
  const firstArticleNumber =
    totalArticles === 0 ? 0 : (currentPage - 1) * ARTICLES_PER_PAGE + 1;
  const lastArticleNumber = Math.min(
    currentPage * ARTICLES_PER_PAGE,
    totalArticles,
  );
  const articleListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: (currentPage - 1) * ARTICLES_PER_PAGE + index + 1,
      url: absoluteUrl(`/articles/${article.slug}`),
      name: article.title,
    })),
  };

  if (currentPage > totalPages && totalArticles > 0) {
    return (
      <main className="container mx-auto px-4 py-20">
        <div className="rounded-2xl border p-10 text-center">
          <h1 className="mb-2 text-2xl font-semibold">Page not found</h1>
          <p className="mb-6 text-muted-foreground">
            The page number is outside the available articles.
          </p>
          <Button asChild>
            <Link href={createPageHref(resolvedSearchParams, totalPages)}>
              Go to last page
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        container
        mx-auto
        px-4
        py-20
      "
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleListJsonLd),
        }}
      />

      <div
        className="
          mb-12
          flex
          flex-col
          gap-6
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        <div>
          <h1
            className="
              mb-4
              text-5xl
              font-bold
            "
          >
            Articles
          </h1>

          <p
            className="
              max-w-2xl
              text-muted-foreground
            "
          >
            Ini adalah halaman untuk melihat semua artikel yang telah
            dipublikasikan.
          </p>
        </div>

        <ArticleSearch categories={categories} tags={tags} />
      </div>

      {articles.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            p-10
            text-center
          "
        >
          <h2
            className="
              mb-2
              text-2xl
              font-semibold
            "
          >
            No articles found
          </h2>

          <p
            className="
              text-muted-foreground
            "
          >
            Try searching with another keyword.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {firstArticleNumber}-{lastArticleNumber} of {totalArticles}{" "}
            articles
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={resolvedSearchParams}
          />
        </>
      )}
    </main>
  );
}
