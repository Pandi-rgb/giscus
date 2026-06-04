"use client";

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

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
      <Trash className="h-4 w-4 hover:cursor-pointer hover:text-secondary-foreground" />
    </button>
  );
}
