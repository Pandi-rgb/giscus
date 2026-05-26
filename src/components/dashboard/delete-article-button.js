"use client";

import { useRouter } from "next/navigation";

export default function DeleteArticleButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Delete this article?");

    if (!confirmed) return;

    const response = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button onClick={handleDelete} className="text-sm text-red-500">
      Delete
    </button>
  );
}
