"use client";

import { useState } from "react";
import { uploadPDF } from "@/lib/supabase/storage";
import { XLineTop } from "lucide-react";
import { uploadCover } from "@/lib/supabase/upload-cover";

export default function ArticleForm({categories}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const pdfFile = formData.get("pdf");

    const coverFile = formData.get("cover");

    let attachment = null;


// bagian upload file PDF dan cover image ke Supabase Storage, lalu dapatkan URL-nya untuk disimpan di database
    let coverImage = null;

    if (coverFile && coverFile.size > 0) {
      coverImage = await uploadCover(coverFile);
    }

    if (pdfFile && pdfFile.size > 0) {
      attachment = await uploadPDF(pdfFile);
    }
    // kirim data ke API route untuk disimpan di database
    const response = await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        categoryId: formData.get("categoryId"),
        attachment,
        coverImage,
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Article created!");
      e.target.reset();
    }
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">Title</label>

          <input
            name="title"
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Slug</label>

          <input
            name="slug"
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Excerpt</label>

          <textarea
            name="excerpt"
            className="w-full rounded-lg border p-3"
            rows={3}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Content</label>

          <textarea
            name="content"
            className="w-full rounded-lg border p-3"
            rows={10}
            required
          />
        </div>

        <div>
          <label
            className="
      mb-2
      block
      font-medium
    "
          >
            Category
          </label>

          <select
            name="categoryId"
            className="
      w-full
      rounded-lg
      border
      p-3
    "
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
          <label
            className="
      mb-2
      block
      font-medium
    "
          >
            Cover Image
          </label>

          <input
            type="file"
            name="cover"
            accept="image/*"
            className="
      w-full
      rounded-lg
      border
      p-3
      bg-yellow-500
      hover:bg-yellow-600
      cursor-pointer
    "
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">PDF File</label>

          <input
            type="file"
            name="pdf"
            accept=".pdf"
            className="
        w-full
        rounded-lg
        border
        p-3
        bg-yellow-500
        hover:bg-yellow-600
        cursor-pointer
      "
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          {loading ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
}
