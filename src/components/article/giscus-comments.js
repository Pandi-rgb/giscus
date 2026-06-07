"use client";

import { useEffect, useRef } from "react";

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

function hasGiscusConfig() {
  return Object.values(giscusConfig).every(Boolean);
}

export default function GiscusComments() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !hasGiscusConfig()) return;

    container.innerHTML = "";

    const script = document.createElement("script");

    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repoId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  if (!hasGiscusConfig()) {
    return (
      <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
        Komentar siap digunakan setelah GitHub Discussions dan Giscus variabel
        environment dikonfigurasi.
      </div>
    );
  }

  return <div ref={containerRef} className="giscus" />;
}
