"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditArticleForm({ article }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const response = await fetch(`/api/articles/${article.id}`, {
      method: "PATCH",

      body: JSON.stringify({
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
      }),
    });

    setLoading(false);

    if (response.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">Title</label>

        <input
          name="title"
          defaultValue={article.title}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Slug</label>

        <input
          name="slug"
          defaultValue={article.slug}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Excerpt</label>

        <textarea
          name="excerpt"
          defaultValue={article.excerpt}
          className="w-full rounded-lg border p-3"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Content</label>

        <textarea
          name="content"
          defaultValue={article.content}
          className="w-full rounded-lg border p-3"
          rows={10}
          required
        />
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        {loading ? "Updating..." : "Update Article"}
      </button>
    </form>
  );
}
