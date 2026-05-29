import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteArticleButton from "@/components/dashboard/delete-article-button";
import LogoutButton from "@/components/dashboard/logout-button";

export default async function DashboardPage() {
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="container mx-auto px-4 py-20 bg-amber-300">
      <div className=" md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-5xl font-bold">Dashboard</h1>

          <p className="mt-2 text-muted-foreground mb-8">
            Manage your research articles.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/articles/new"
            className="
      rounded-lg
      bg-black
      px-4
      py-2
      text-white
      text-sm
    "
          >
            New Article
          </Link>

          <LogoutButton />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-cyan-700">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Created</th>

              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b">
                <td className="px-6 py-4">
                  <div>
                    <h2 className="font-semibold">{article.title}</h2>

                    <p className="text-sm text-muted-foreground">
                      {article.slug}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {article.published ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      Draft
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/dashboard/articles/${article.id}/edit`}
                      className="text-sm font-medium"
                    >
                      Edit
                    </Link>

                    <DeleteArticleButton id={article.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
