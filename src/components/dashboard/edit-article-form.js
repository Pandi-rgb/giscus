"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadPDF } from "@/lib/supabase/storage";
import { uploadCover } from "@/lib/supabase/upload-cover";
import RichTextEditor from "./rich-text-editor";
import { toast } from "sonner";
import { Loader2, Save, Image as ImageIcon, FileUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EditArticleForm({
  article,
  categories = [],
  tags = [],
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(article?.content || "");
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [published, setPublished] = useState(article?.published ? "true" : "false");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Judul artikel wajib diisi.");
      return;
    }

    if (!content.trim()) {
      toast.error("Isi konten artikel tidak boleh kosong.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const pdfFile = formData.get("pdf");
    const coverFile = formData.get("cover");

    let coverImage = article.coverImage;
    let attachment = article.attachment;

    try {
      if (coverFile && coverFile.size > 0) {
        try {
          coverImage = await uploadCover(coverFile);
        } catch (uploadErr) {
          console.error("Gagal upload cover ke storage:", uploadErr);
          toast.warning("Gagal memperbarui foto sampul di storage. Menggunakan cover sebelumnya.");
        }
      }

      if (pdfFile && pdfFile.size > 0) {
        try {
          attachment = await uploadPDF(pdfFile);
        } catch (uploadErr) {
          console.error("Gagal upload PDF ke storage:", uploadErr);
          toast.warning("Gagal memperbarui dokumen PDF di storage. Menggunakan file sebelumnya.");
        }
      }

      const response = await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug ? slugify(slug) : slugify(title),
          excerpt: formData.get("excerpt"),
          content,
          published: published === "true",
          categoryId: formData.get("categoryId") || null,
          tagNames: formData
            .get("tags")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          attachment,
          coverImage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal memperbarui artikel.");
      }

      toast.success("Artikel berhasil diperbarui!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Gagal mengupdate artikel:", error);
      toast.error(error.message || "Gagal memperbarui artikel.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl rounded-3xl border bg-card p-6 shadow-xs sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Judul Artikel <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            required
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Slug URL <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center rounded-xl border bg-background px-3 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
            <span className="text-xs text-muted-foreground">/articles/</span>
            <input
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-transparent px-2 py-3 text-sm outline-none"
              required
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Abstrak / Ringkasan Singkat
          </label>
          <textarea
            name="excerpt"
            defaultValue={article?.excerpt || ""}
            rows={3}
            className="w-full resize-y rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Naskah Lengkap Artikel <span className="text-red-500">*</span>
          </label>
          <div className="rounded-xl border border-input">
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Meta Options Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Kategori
            </label>
            <select
              name="categoryId"
              defaultValue={article?.categoryId || ""}
              className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Tag (Pisahkan Koma)
            </label>
            <input
              name="tags"
              defaultValue={article?.tags?.map((t) => t.name).join(", ") || ""}
              list="available-tags"
              placeholder="Media, Riset, AI"
              className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
            <datalist id="available-tags">
              {tags.map((tag) => (
                <option key={tag.id} value={tag.name} />
              ))}
            </datalist>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Status Publikasi
            </label>
            <select
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="true">Published (Langsung Tayang)</option>
              <option value="false">Draft (Simpan Sementara)</option>
            </select>
          </div>
        </div>

        {/* Uploads Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Cover Image */}
          <div className="space-y-2 rounded-2xl border border-dashed border-border p-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ImageIcon className="h-4 w-4 text-cyan-600" />
                Ganti Foto Sampul
              </label>
              {article?.coverImage && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle className="h-3 w-3" /> Cover tersimpan
                </span>
              )}
            </div>
            <input
              type="file"
              name="cover"
              accept="image/*"
              className="w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-800 hover:file:bg-cyan-200 dark:file:bg-cyan-950 dark:file:text-cyan-300"
            />
          </div>

          {/* PDF Attachment */}
          <div className="space-y-2 rounded-2xl border border-dashed border-border p-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileUp className="h-4 w-4 text-cyan-600" />
                Ganti Dokumen PDF
              </label>
              {article?.attachment && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle className="h-3 w-3" /> PDF tersimpan
                </span>
              )}
            </div>
            <input
              type="file"
              name="pdf"
              accept=".pdf"
              className="w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-800 hover:file:bg-cyan-200 dark:file:bg-cyan-950 dark:file:text-cyan-300"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={loading}
          >
            Batal
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 px-6 font-semibold text-white hover:bg-cyan-500"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memperbarui...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
