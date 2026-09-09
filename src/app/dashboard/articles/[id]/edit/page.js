import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditArticleForm from "@/components/dashboard/edit-article-form";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }) {
  const { id } = await params;

  let article = null;
  let categories = [];
  let tags = [];

  try {
    [article, categories, tags] = await Promise.all([
      prisma.article.findUnique({
        where: { id },
        include: {
          attachment: true,
          tags: true,
          category: true,
        },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
      prisma.tag.findMany({
        orderBy: { name: "asc" },
      }),
    ]);
  } catch (error) {
    console.error("Error loading article for edit:", error);
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="py-6">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-3.5 w-3.5" />
          Kembali ke Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Edit Artikel Penelitian
        </h1>
        <p className="text-sm text-muted-foreground">
          Perbarui teks artikel, kategori, tag, status publikasi, serta berkas PDF pendukung.
        </p>
      </div>

      <EditArticleForm article={article} categories={categories} tags={tags} />
    </div>
  );
}
