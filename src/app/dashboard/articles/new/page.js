import ArticleForm from "@/components/dashboard/article-form";

export default function NewArticlePage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-20">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">New Article</h1>

        <p className="mt-2 text-muted-foreground">
          Create a new research article.
        </p>
      </div>

      <ArticleForm />
    </main>
  );
}
