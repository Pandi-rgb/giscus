import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteArticleButton from "@/components/dashboard/delete-article-button";
// import LogoutButton from "@/components/dashboard/logout-button";
import {SquarePen} from "lucide-react";

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
    <main className="container mx-auto px-4 py-20 min-h-screen">
      <div className=" md:flex items-center justify-between bg-linear-to-r from-Ketiga via-Primary to-Secondary p-6 rounded-lg mb-2">
        <div className="text-slate-200 mx-auto">
          <h1 className="text-2xl md:text-5xl font-bold flex items-center justify-center">Dashboard</h1>

          <p className="mt-2 text-muted-foreground text-md mb-8">
          Kelola artikel Anda dengan mudah melalui dashboard ini.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-cyan-700">
        <table className="w-full rounded-xl border bg-white shadow-sm">
          <thead className="border-b bg-slate-200">
            <tr className="hover:bg-slate-200">
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
                      <SquarePen className="h-4 w-4 hover:cursor-pointer hover:text-blue-500" />
                    </Link>

                    <DeleteArticleButton id={article.id}/>
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
