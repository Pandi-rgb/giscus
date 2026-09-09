import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/dashboard/article-form";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  let categories = [];
  let tags = [];

  try {
    [categories, tags] = await prisma.$transaction([
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
    console.error("Error loading categories/tags:", error);
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
          Tulis Artikel Penelitian Baru
        </h1>
        <p className="text-sm text-muted-foreground">
          Isi detail naskah artikel, unggah foto sampul, dan lampirkan dokumen PDF lengkap.
        </p>
      </div>

      <ArticleForm categories={categories} tags={tags} />
    </div>
  );
}
