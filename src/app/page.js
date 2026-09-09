import Image from "next/image";
import logo from "@/../public/LOGO_HITAM.png";
import Link from "next/link";
import { Newspaper, Building2, FileText, ArrowRight, ShieldCheck, Flame, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/article/article-card";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  path: "/",
});

export default async function HomePage() {
  let featuredArticles = [];

  try {
    featuredArticles = await prisma.article.findMany({
      where: {
        published: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
  } catch (error) {
    console.error("Database query failed in HomePage:", error);
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            name: siteConfig.name,
            description: siteConfig.description,
            url: absoluteUrl("/"),
            logo: absoluteUrl("/LOGO_HITAM.png"),
            potentialAction: {
              "@type": "SearchAction",
              target: `${absoluteUrl("/articles")}?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative flex min-h-[85vh] flex-col items-center justify-center bg-gradient-to-r from-Primary via-Secondary to-Ketiga px-4 py-24 text-center text-slate-100"
      >
        <div className="container mx-auto flex max-w-4xl flex-col items-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-200 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4" />
            Portal Berita & Perusahaan Media Digital Terpercaya
          </span>

          <div className="mb-6 max-w-3xl">
            <Image
              src={logo}
              alt="Posisi 21 Media"
              className="mx-auto mb-4 h-32 w-auto object-contain md:h-44 drop-shadow-2xl"
              priority
            />
          </div>

          <h1 className="sr-only">Posisi 21 Media - Portal Berita dan Artikel</h1>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-300 md:text-xl">
            Menyajikan berita terkini, liputan mendalam, artikel investigasi,
            dan analisis tajam berimbang dari ruang redaksi independen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-400 hover:shadow-cyan-500/25"
            >
              <Link href="/articles">
                <Newspaper className="mr-2 h-5 w-5" />
                Baca Berita & Artikel
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Link href="/about">
                <Building2 className="mr-2 h-5 w-5" />
                Profil Perusahaan
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div>
            <span className="mb-3 inline-flex rounded-full border bg-card px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground shadow-xs">
              Tentang Perusahaan Media
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
              Komitmen jurnalisme akurat, independen, dan berintegritas.
            </h2>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <p className="text-base leading-relaxed">
              <strong>Posisi 21 Media</strong> adalah entitas perusahaan media digital
              yang berfokus pada produksi jurnalisme berkualitas tinggi, penyajian fakta terverifikasi,
              analisis tren nasional, serta artikel tematik mendalam. Kami mendedikasikan
              ruang redaksi untuk mencerdaskan kehidupan bangsa melalui informasi yang kredibel dan objektif.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border-l-2 border-cyan-500 pl-4">
                <div className="text-2xl font-bold text-foreground">
                  {featuredArticles.length}
                </div>
                <p className="text-xs text-muted-foreground">Publikasi Terkini</p>
              </div>
              <div className="border-l-2 border-cyan-500 pl-4">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <p className="text-xs text-muted-foreground">Liputan Informasi</p>
              </div>
              <div className="border-l-2 border-cyan-500 pl-4">
                <div className="text-2xl font-bold text-foreground">Multi-Kanal</div>
                <p className="text-xs text-muted-foreground">Rubrik Berita & Artikel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Articles Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              <Flame className="h-3.5 w-3.5" />
              Kanal Redaksi
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Berita & Artikel Terkini
            </h2>
          </div>

          <Button variant="outline" asChild>
            <Link href="/articles">
              Semua Berita & Artikel <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featuredArticles.length === 0 ? (
          <div className="rounded-3xl border bg-card p-12 text-center shadow-xs">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/60" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Belum Ada Berita yang Diterbitkan
            </h3>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              Berita dan artikel yang telah diverifikasi oleh tim redaksi akan tampil di halaman ini.
            </p>
            <Button asChild className="mt-6 bg-cyan-600 hover:bg-cyan-500">
              <Link href="/articles">Kunjungi Halaman Berita</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
