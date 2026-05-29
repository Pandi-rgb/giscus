import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  {
    url: absoluteUrl("/"),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: absoluteUrl("/articles"),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/about"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: absoluteUrl("/contact"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default async function sitemap() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return [
      ...staticRoutes,
      ...articles.map((article) => ({
        url: absoluteUrl(`/articles/${article.slug}`),
        lastModified: article.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      })),
    ];
  } catch (error) {
    console.error("Failed to generate article sitemap entries:", error);

    return staticRoutes;
  }
}
