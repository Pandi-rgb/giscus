"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export default function ArticleSearch({ categories = [] }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      router.replace(`/articles?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, category, router, searchParams]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
      <Input
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-[320px]"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-lg border p-3 md:w-auto"
      >
        <option value="">All categories</option>
        {categories.map((categoryOption) => (
          <option key={categoryOption.id} value={categoryOption.slug}>
            {categoryOption.name}
          </option>
        ))}
      </select>
    </div>
  );
}
