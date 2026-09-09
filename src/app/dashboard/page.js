import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteArticleButton from "@/components/dashboard/delete-article-button";
import {
  SquarePen,
  PlusCircle,
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
  Tag,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let articles = [];
  let categories = [];
  let tags = [];

  try {
    [articles, categories, tags] = await Promise.all([
      prisma.article.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      }),
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
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }

  const publishedCount = articles.filter((a) => a.published).length;
  const draftCount = articles.filter((a) => !a.published).length;

  return (
    <div className="py-8">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-Primary via-Secondary to-Ketiga p-6 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard Pengelolaan Artikel
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Kelola publikasi karya ilmiah, draf penelitian, dan lampiran PDF.
          </p>
        </div>

        <Button asChild className="bg-cyan-500 font-medium text-slate-950 hover:bg-cyan-400">
          <Link href="/dashboard/articles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tulis Artikel Baru
          </Link>
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Total Artikel
            </span>
            <FileText className="h-4 w-4 text-cyan-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-foreground">
            {articles.length}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Published
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-600">
            {publishedCount}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Draft
            </span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-amber-600">
            {draftCount}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Kategori & Tag
            </span>
            <FolderOpen className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-foreground">
            {categories.length + tags.length}
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-xs">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold text-foreground">Daftar Seluruh Artikel</h2>
        </div>

        {articles.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <FileText className="mx-auto mb-3 h-10 w-10 text-muted-foreground/60" />
            <p className="font-medium text-foreground">Belum ada artikel di database</p>
            <p className="mt-1 text-xs">
              Mulai publikasi riset pertama Anda dengan mengklik tombol "Tulis Artikel Baru".
            </p>
            <Button asChild size="sm" className="mt-4 bg-cyan-600 hover:bg-cyan-500">
              <Link href="/dashboard/articles/new">
                <PlusCircle className="mr-1.5 h-4 w-4" />
                Tambah Sekarang
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Judul & Slug</th>
                  <th className="px-6 py-3.5 font-medium">Kategori</th>
                  <th className="px-6 py-3.5 font-medium">Status</th>
                  <th className="px-6 py-3.5 font-medium">Dibuat Pada</th>
                  <th className="px-6 py-3.5 text-right font-medium">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {articles.map((article) => (
                  <tr key={article.id} className="transition hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="font-semibold text-foreground hover:text-cyan-600"
                        >
                          {article.title}
                        </Link>
                        <p className="text-xs text-muted-foreground truncate">
                          /{article.slug}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {article.category?.name ? (
                        <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                          {article.category.name}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {article.published ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {article.published && (
                          <Link
                            href={`/articles/${article.slug}`}
                            title="Lihat di Web Publik"
                            target="_blank"
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}

                        <Link
                          href={`/dashboard/articles/${article.id}/edit`}
                          title="Edit Artikel"
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-cyan-600"
                        >
                          <SquarePen className="h-4 w-4" />
                        </Link>

                        <DeleteArticleButton id={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
