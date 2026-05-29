"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import katex from "katex";

export default function ArticleContent({ content }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const root = contentRef.current;

    if (!root) return;

    root.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });

    root.querySelectorAll('[data-type="inline-math"]').forEach((node) => {
      const latex = node.getAttribute("data-latex");

      if (!latex) return;

      katex.render(latex, node, {
        displayMode: false,
        throwOnError: false,
      });
    });

    root.querySelectorAll('[data-type="block-math"]').forEach((node) => {
      const latex = node.getAttribute("data-latex");

      if (!latex) return;

      katex.render(latex, node, {
        displayMode: true,
        throwOnError: false,
      });
    });
  }, [content]);

  return (
    <article
      ref={contentRef}
      className="prose prose-lg max-w-none wrap-break-word"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
