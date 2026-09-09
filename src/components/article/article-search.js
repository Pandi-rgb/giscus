"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ArticleSearch({ categories = [], tags = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "";
  const urlTag = searchParams.get("tag") || "";
  const urlSort = searchParams.get("sort") || "newest";

  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState(urlCategory);
  const [tag, setTag] = useState(urlTag);
  const [sort, setSort] = useState(urlSort);

  // Sync state if URL changes externally
  useEffect(() => {
    setQuery(urlQuery);
    setCategory(urlCategory);
    setTag(urlTag);
    setSort(urlSort);
  }, [urlQuery, urlCategory, urlTag, urlSort]);

  const isFiltered = Boolean(
    query || category || tag || (sort && sort !== "newest"),
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set("q", query.trim());
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

      // Only push if different from current query
      if (`/articles?${searchParams.toString()}` !== targetUrl && (`/articles` !== targetUrl || searchParams.toString() !== "")) {
        router.replace(targetUrl);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [query, category, tag, sort, router, searchParams]);

  function handleReset() {
    setQuery("");
    setCategory("");
    setTag("");
    setSort("newest");
    router.replace("/articles");
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search Input */}
      <div className="relative min-w-[220px] flex-1 sm:w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari judul atau topik..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 bg-card text-foreground"
        />
      </div>

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-xs outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      >
        <option value="">Semua Kategori</option>
        {categories.map((categoryOption) => (
          <option key={categoryOption.id} value={categoryOption.slug}>
            {categoryOption.name}
          </option>
        ))}
      </select>

      {/* Tag Dropdown */}
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-xs outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      >
        <option value="">Semua Tag</option>
        {tags.map((tagOption) => (
          <option key={tagOption.id} value={tagOption.slug}>
            #{tagOption.name}
          </option>
        ))}
      </select>

      {/* Sort Dropdown */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-xs outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
        <option value="title">Judul (A-Z)</option>
      </select>

      {/* Reset Filter Button */}
      {isFiltered && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-9 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Reset
        </Button>
      )}
    </div>
  );
}
