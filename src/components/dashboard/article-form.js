"use client";

import { useState } from "react";

export default function ArticleForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const response = await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Article created!");
      e.target.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">Title</label>

        <input name="title" className="w-full rounded-lg border p-3" required />
      </div>

      <div>
        <label className="mb-2 block font-medium">Slug</label>

        <input name="slug" className="w-full rounded-lg border p-3" required />
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

      <button
        disabled={loading}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        {loading ? "Creating..." : "Create Article"}
      </button>
    </form>
  );
}
