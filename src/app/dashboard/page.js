import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Manage your research articles.
          </p>
        </div>

        <Link
          href="/dashboard/articles/new"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          New Article
        </Link>
      </div>
    </main>
  );
}
