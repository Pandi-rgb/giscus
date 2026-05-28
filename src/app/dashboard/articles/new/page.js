import { prisma } from "@/lib/prisma";

import ArticleForm from "@/components/dashboard/article-form";

export default async function NewArticlePage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <ArticleForm categories={categories} />;
}
