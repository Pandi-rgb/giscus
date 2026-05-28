"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export default function ArticleSearch({ categories = [], tags = [] }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialTag = searchParams.get("tag") || "";
  const initialSort = searchParams.get("sort") || "newest";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [tag, setTag] = useState(initialTag);
  const [sort, setSort] = useState(initialSort);

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

      if (tag) {
        params.set("tag", tag);
      } else {
        params.delete("tag");
      }

      if (sort && sort !== "newest") {
        params.set("sort", sort);
      } else {
        params.delete("sort");
      }

      params.delete("page");

      const queryString = params.toString();
      const targetUrl = queryString ? `/articles?${queryString}` : "/articles";

      router.replace(targetUrl);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, category, tag, sort, router, searchParams]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4">
      <Input
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full lg:w-[280px]"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-lg border bg-white p-3 lg:w-auto"
      >
        <option value="">All categories</option>
        {categories.map((categoryOption) => (
          <option key={categoryOption.id} value={categoryOption.slug}>
            {categoryOption.name}
          </option>
        ))}
      </select>

      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="w-full rounded-lg border bg-white p-3 lg:w-auto"
      >
        <option value="">All tags</option>
        {tags.map((tagOption) => (
          <option key={tagOption.id} value={tagOption.slug}>
            {tagOption.name}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full rounded-lg border bg-white p-3 lg:w-auto"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
  );
}
