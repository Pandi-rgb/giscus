import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ article }) {
  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-white
        transition
        hover:shadow-lg
      "
    >
      {article.coverImage && (
        <Image
          src={article.coverImage}
          alt={article.title}
          width={800}
          height={400}
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, calc(100vw - 2rem)"
          className="
            h-56
            w-full
            object-cover
          "
        />
      )}

      <div className="p-6">
        <div
          className="
            mb-4
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-muted-foreground
          "
        >
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          {article.category?.name && (
            <span className="rounded-full bg-muted px-2 py-1 text-xs">
              {article.category.name}
            </span>
          )}
        </div>

        <h2
          className="
            mb-3
            text-2xl
            font-bold
          "
        >
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h2>

        <p
          className="
            mb-6
            text-muted-foreground
          "
        >
          {article.excerpt}
        </p>

        <Link
          href={`/articles/${article.slug}`}
          className="
            text-sm
            font-medium
          "
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
