import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Newspaper,
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2,
  Users2,
  Award,
  Globe2,
  ArrowUpRight,
  BookOpen,
  Mail,
  Scale,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
// import logo from "../../public/LOGO_HITAM.png";


export const metadata = createMetadata({
  title: "Tentang Kami",
  description:
    "Profil perusahaan media Posisi 21 Media, visi misi, standar jurnalisme independen, kanal pemberitaan, dan susunan dewan redaksi.",
  path: "/about",
});

const RUBRICS = [
  {
    title: "Berita Nasional & Kebijakan Publik",
    description:
      "Liputan dinamika peristiwa nasional, perkembangan hukum, tata kelola pemerintahan, dan kebijakan publik yang berdampak langsung pada masyarakat.",
    tags: ["Nasional", "Hukum & Politik", "Kebijakan Publik"],
  },
  {
    title: "Ekonomi, Bisnis & Keuangan",
    description:
      "Analisis pergerakan pasar, ekonomi makro, industri kreatif, kewirausahaan, serta transformasi sektor digital di Indonesia.",
    tags: ["Ekonomi", "Pasar Modal", "Finansial"],
  },
  {
    title: "Sains, Riset & Teknologi",
    description:
      "Ulasan inovasi kecerdasan buatan (AI), penemuan ilmiah terkini, keamanan siber, dan perkembangan ekosistem teknologi informasi.",
    tags: ["Sains", "Teknologi", "Kecerdasan Buatan"],
  },
  {
    title: "Opini, Esai & Artikel Tematik",
    description:
      "Ruang gagasan kritis dan perspektif mendalam dari para akademisi, pakar industri, jurnalis senior, dan pengamat publik.",
    tags: ["Kolom Opini", "Esai Pakar", "Analisis Kritis"],
  },
];

const EDITORIAL_PRINCIPLES = [
  {
    title: "Akurasi & Verifikasi Berlapis",
    description:
      "Setiap informasi yang kami terbitkan melalui proses konfirmasi fakta ketat, menghindari rumor, dan memastikan kejelasan sumber.",
  },
  {
    title: "Independensi Redaksi",
    description:
      "Ruang redaksi kami bebas dari intervensi kekuatan politik dan kepentingan komersial demi menjaga kemurnian fakta.",
  },
  {
    title: "Kepatuhan Kode Etik Jurnalistik",
    description:
      "Berpedoman teguh pada Undang-Undang Pers No. 40 Tahun 1999 dan Pedoman Pemberitaan Media Siber (PPMS) yang ditetapkan Dewan Pers.",
  },
  {
    title: "Koreksi & Hak Jawab Terbuka",
    description:
      "Kami berkomitmen melakukan ralat transparan dan memberikan hak jawab secara proporsional jika terdapat kekeliruan data.",
  },
];

const EDITORIAL_BOARD = [
  {
    role: "Pemimpin Redaksi (Editor-in-Chief)",
    name: "Redaksi Posisi 21 Media",
    description:
      "Bertanggung jawab penuh atas kebijakan redaksional, penegakan etika jurnalisme, dan integritas seluruh produk publikasi.",
  },
  {
    role: "Redaktur Pelaksana & Investigasi",
    name: "Desk Berita & Investigasi",
    description:
      "Mengkoordinasikan liputan lapangan harian, pelaporan investigasi khusus, serta penelusuran data mendalam.",
  },
  {
    role: "Redaktur Artikel & Opini",
    name: "Desk Opini & Kebudayaan",
    description:
      "Mengkurasi artikel pemikiran, esai analitis, dan sumbangan tulisan dari para akademisi serta pakar eksternal.",
  },
  {
    role: "Divisi Multimedia & Teknologi Media",
    name: "Tim Media Siber & Data",
    description:
      "Mengembangkan infrastruktur platform digital, infografis data interaktif, dan optimalisasi penyebaran konten berita.",
  },
];

const COMPANY_METRICS = [
  { label: "Liputan Redaksi", value: "24/7" },
  { label: "Kanal Pemberitaan", value: "4+" },
  { label: "Standar Akurasi", value: "100%" },
  { label: "Prinsip Media", value: "Independen" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="bg-gradient-to-r from-Primary via-Secondary to-Ketiga px-4 py-24 text-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            {/* Corporate Badge Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-700 to-slate-500 text-4xl font-extrabold text-white shadow-2xl ring-4 ring-white/20 md:h-44 md:w-44">
                <Image src="/LOGO_HITAM.png" alt="Logo" width={100} height={100} style={{ height: "auto" }} priority />
              </div>
              <div className="absolute -bottom-3 -right-2 flex items-center gap-1 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-slate-950 shadow-md">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Media Riset
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-cyan-200 backdrop-blur-sm">
                <Building2 className="h-3.5 w-3.5" />
                Profil Perusahaan Media
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Tentang Posisi 21 Media
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                Perusahaan media digital dan penerbitan siber yang berdedikasi
                menghadirkan jurnalisme berkualitas, independensi ruang redaksi,
                berita aktual, serta artikel analitis yang mencerahkan publik.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2 md:justify-start">
                <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                  <Link href="/articles">
                    <Newspaper className="mr-2 h-4 w-4" />
                    Baca Berita & Artikel
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Hubungi Redaksi
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:grid-cols-4">
            {COMPANY_METRICS.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-2xl font-extrabold text-cyan-300 md:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-300 md:text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto max-w-5xl space-y-16 px-4 py-16">
        {/* Company Identity & Vision Mission */}
        <section className="rounded-3xl border bg-card p-8 shadow-sm md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Target className="h-4 w-4 text-cyan-600" />
            Visi & Misi Perusahaan
          </div>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl text-foreground">
            Menghadirkan Informasi yang Bernilai, Akurat, dan Berdampak
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border bg-background p-6">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <Eye className="h-5 w-5 text-cyan-600" />
                Visi Kami
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Menjadi pilar media siber terdepan yang tepercaya, berintegritas,
                dan menjadi rujukan utama publik dalam memahami dinamika sosial, ekonomi,
                sains, dan kebijakan publik di Indonesia.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border bg-background p-6">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <ShieldCheck className="h-5 w-5 text-cyan-600" />
                Misi Kami
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  Menyajikan berita secara cepat, akurat, dan berimbang sesuai kode etik jurnalistik.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  Menyediakan ruang artikel analitis dan opini mendalam dari berbagai perspektif pakar.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  Mendorong keterbukaan informasi dan literasi media digital bagi masyarakat luas.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Rubrics / News Channels */}
        <section>
          <div className="mb-8">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Newspaper className="h-4 w-4 text-cyan-600" />
              Kanal Redaksional
            </div>
            <h2 className="text-2xl font-bold md:text-3xl text-foreground">
              Rubrik Berita & Artikel
            </h2>
            <p className="mt-1 text-muted-foreground">
              Fokus pemberitaan terstruktur yang disajikan oleh tim redaksi kami.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {RUBRICS.map((rubric) => (
              <div
                key={rubric.title}
                className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-xs transition hover:border-cyan-500/50 hover:shadow-md"
              >
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {rubric.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {rubric.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 pt-2">
                  {rubric.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Standards & Ethics */}
        <section>
          <div className="mb-8">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Scale className="h-4 w-4 text-cyan-600" />
              Etika & Kepatuhan
            </div>
            <h2 className="text-2xl font-bold md:text-3xl text-foreground">
              Standar & Pedoman Media Siber
            </h2>
            <p className="mt-1 text-muted-foreground">
              Prinsip redaksional yang menjadi komitmen teguh Posisi 21 Media.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {EDITORIAL_PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border bg-card p-6 shadow-xs transition hover:shadow-sm"
              >
                <h3 className="mb-2 text-base font-bold text-foreground">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Board */}
        <section>
          <div className="mb-8">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Users2 className="h-4 w-4 text-cyan-600" />
              Struktur Organisasi
            </div>
            <h2 className="text-2xl font-bold md:text-3xl text-foreground">
              Susunan Redaksi & Manajemen
            </h2>
            <p className="mt-1 text-muted-foreground">
              Struktur penanggung jawab operasional redaksional dan penerbitan berita.
            </p>
          </div>

          <div className="space-y-4">
            {EDITORIAL_BOARD.map((item) => (
              <div
                key={item.role}
                className="rounded-2xl border bg-card p-6 shadow-xs transition hover:shadow-sm"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="text-base font-bold text-foreground">{item.role}</h3>
                  <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                    {item.name}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Media Partnership CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-Primary via-Secondary to-Ketiga p-8 text-center text-white shadow-xl md:p-12">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Kerjasama Media & Pengiriman Siaran Pers
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            Terbuka untuk kemitraan publikasi, penerimaan siaran pers (press release),
            liputan khusus, serta kerjasama advertorial dan media partner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              <Link href="/contact">
                Hubungi Redaksi <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/articles">
                Telusuri Berita Terkini <Newspaper className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
