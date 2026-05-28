"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export default function ArticleSearch() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      router.replace(`/articles?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, router, searchParams]);

  return (
    <Input
      placeholder="Search articles..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="
        w-full
        md:w-[320px]
      "
    />
  );
}
