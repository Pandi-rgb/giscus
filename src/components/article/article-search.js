"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function ArticleSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(value) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/articles?${params.toString()}`);
  }

  return (
    <Input
      placeholder="Search articles..."
      defaultValue={searchParams.get("search") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-md"
    />
  );
}
