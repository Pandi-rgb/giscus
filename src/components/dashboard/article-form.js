"use client";

import { useState } from "react";
import { uploadPDF } from "@/lib/supabase/storage";
import { uploadCover } from "@/lib/supabase/upload-cover";
import RichTextEditor from "./rich-text-editor"; // 🆕 Import Tiptap Editor baru

export default function ArticleForm({ categories, tags = [] }) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(""); // 🆕 State khusus untuk menampung HTML Tiptap

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const pdfFile = formData.get("pdf");
    const coverFile = formData.get("cover");

    let attachment = null;
    let coverImage = null;

    try {
      if (coverFile && coverFile.size > 0) {
        coverImage = await uploadCover(coverFile);
      }

      if (pdfFile && pdfFile.size > 0) {
        attachment = await uploadPDF(pdfFile);
      }

      // Kirim data ke API route untuk disimpan di database
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          slug: formData.get("slug"),
          excerpt: formData.get("excerpt"),
          content: content, // 🆕 Kirim nilai dari state Tiptap, bukan dari formData
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
        alert("Article created!");
        e.target.reset();
        setContent(""); // 🆕 Kosongkan kembali editor Tiptap setelah sukses
      }
    } catch (error) {
      console.error("Gagal membuat artikel:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mb-8 mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">Judul</label>
          <input
            name="title"
            className="w-full rounded-lg border p-3 bg-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Slug</label>
          <input
            name="slug"
            className="w-full rounded-lg border p-3 bg-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Abstrak</label>
          <textarea
            name="excerpt"
            className="w-full rounded-lg border p-3 bg-white"
            rows={3}
          />
        </div>

        {/* 🆕 GANTI TEXTAREA KONTEN LAMA DENGAN TIPTAP EDITOR */}
        <div>
          <label className="mb-2 block font-medium">Konten</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div>
          <label className="mb-2 block font-medium">Kategori</label>
          <select
            name="categoryId"
            className="cursor-pointer w-full rounded-lg border p-3 bg-white"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Tag</label>
          <input
            name="tags"
            list="available-tags"
            placeholder="Berikan tag, pisahkan dengan koma"
            className="w-full rounded-lg border p-3 bg-white"
          />
          <datalist id="available-tags">
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="mb-2 block font-medium">Foto Sampul</label>
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="w-full rounded-lg border p-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white font-medium"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">PDF File</label>
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            className="w-full rounded-lg border p-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white font-medium"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white font-medium disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
}
