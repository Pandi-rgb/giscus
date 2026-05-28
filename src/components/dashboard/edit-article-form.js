"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadPDF } from "@/lib/supabase/storage";
import { uploadCover } from "@/lib/supabase/upload-cover";
import RichTextEditor from "./rich-text-editor"; // Import Tiptap Editor

export default function EditArticleForm({ article, categories = [] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 🆕 Ambil tulisan artikel lama dari database sebagai default text Tiptap
  const [content, setContent] = useState(article?.content || "");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const pdfFile = formData.get("pdf");
    const coverFile = formData.get("cover");

    // Jika admin tidak ganti file, gunakan URL file lama dari database
    let coverImage = article.coverImage;
    let attachment = article.attachment;

    try {
      if (coverFile && coverFile.size > 0) {
        coverImage = await uploadCover(coverFile);
      }

      if (pdfFile && pdfFile.size > 0) {
        attachment = await uploadPDF(pdfFile);
      }

      // Kirim pembaruan data ke API route menggunakan metode PUT
      const response = await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          slug: formData.get("slug"),
          excerpt: formData.get("excerpt"),
          content: content, // Teks yang sudah diedit di Tiptap
          categoryId: formData.get("categoryId"),
          tagNames: formData
            .get("tags")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          attachment,
          coverImage,
        }),
      });

      if (response.ok) {
        alert("Article updated successfully!");
        router.push("/dashboard/articles");
        router.refresh();
      }
    } catch (error) {
      console.error("Gagal mengupdate artikel:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">Title</label>
          <input
            name="title"
            defaultValue={article?.title}
            className="w-full rounded-lg border p-3 bg-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Slug</label>
          <input
            name="slug"
            defaultValue={article?.slug}
            className="w-full rounded-lg border p-3 bg-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Excerpt</label>
          <textarea
            name="excerpt"
            defaultValue={article?.excerpt}
            className="w-full rounded-lg border p-3 bg-white"
            rows={3}
          />
        </div>

        {/* AREA TIPTAP EDIT MODE */}
        <div>
          <label className="mb-2 block font-medium">Content</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div>
          <label className="mb-2 block font-medium">Category</label>
          <select
            name="categoryId"
            defaultValue={article?.categoryId || ""}
            className="w-full rounded-lg border p-3 bg-white"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Tags</label>
          <input
            name="tags"
            defaultValue={article?.tags?.map((tag) => tag.name).join(", ")}
            placeholder="research, publication, data"
            className="w-full rounded-lg border p-3 bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Cover Image</label>
          {article?.coverImage && (
            <p className="text-xs text-green-600 mb-1">✓ File lama tersimpan</p>
          )}
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="w-full rounded-lg border p-3 bg-yellow-500 text-white font-medium cursor-pointer"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">PDF File</label>
          {article?.attachment && (
            <p className="text-xs text-green-600 mb-1">✓ PDF lama tersimpan</p>
          )}
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            className="w-full rounded-lg border p-3 bg-yellow-500 text-white font-medium cursor-pointer"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white font-medium disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
}
