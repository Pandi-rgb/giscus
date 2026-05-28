import { prisma } from "@/lib/prisma";

import ArticleForm from "@/components/dashboard/article-form";

export default async function NewArticlePage() {
  const [categories, tags] = await prisma.$transaction([
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
  ]);

  return <ArticleForm categories={categories} tags={tags} />;
}
