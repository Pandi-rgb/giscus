import {
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  BookOpen,
  Globe,
  Share2,
  HelpCircle,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import ContactForm from "./contact-form";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Hubungi Posisi 21 Media Research Repository untuk kolaborasi akademik, pertanyaan publikasi, dan kueri riset profesional.",
  path: "/contact",
});

const SOCIAL_LINKS = [
  {
    name: "Google Scholar",
    url: "https://scholar.google.com",
    handle: "Koleksi Sitasi & Riset",
    description: "Indeks sitasi ilmiah dan publikasi terindeks",
  },
  {
    name: "ORCID",
    url: "https://orcid.org",
    handle: "0009-0002-8192-301X",
    description: "Identitas peneliti global terstandarisasi",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    handle: "Profil Profesional Dekan",
    description: "Jejaring karier dan pengumuman akademik",
  },
  {
    name: "GitHub",
    url: "https://github.com/Pandi-rgb",
    handle: "@Pandi-rgb",
    description: "Repositori kode dan proyek sains terbuka",
  },
];

const FAQS = [
  {
    q: "Apakah seluruh artikel dan dokumen PDF dapat diunduh gratis?",
    a: "Ya, seluruh artikel hasil penelitian dan dokumen lampiran PDF dalam repositori ini menganut prinsip Open Access dan dapat diunduh tanpa dipungut biaya untuk kepentingan akademik dan pembelajaran.",
  },
  {
    q: "Bagaimana cara mengajukan sitasi artikel dari website ini?",
    a: "Setiap artikel mencantumkan judul lengkap, penulis, tanggal publikasi, dan tautan permanen (canonical URL). Anda dapat menyitir langsung menggunakan format APA, IEEE, atau Harvard.",
  },
  {
    q: "Berapa lama rata-rata respons atas pesan yang dikirimkan?",
    a: "Pesan yang masuk melalui formulir resmi ditinjau langsung oleh tim akademik dan direspons dalam 1 hingga 2 hari kerja operasional.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-Primary via-Secondary to-Ketiga px-4 py-20 text-slate-100">
        <div className="container mx-auto max-w-5xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-cyan-200">
            <Mail className="h-3.5 w-3.5" />
            Saluran Komunikasi Resmi
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Kontak & Hubungan Akademik
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300 md:text-lg">
            Terbuka untuk diskusi ilmiah, kolaborasi penulisan publikasi, verifikasi
            dokumen riset, maupun undangan akademik dan kemitraan.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Interactive Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Details & Academic Profiles */}
          <div className="space-y-8">
            {/* Office Info Card */}
            <div className="rounded-3xl border bg-card p-6 shadow-xs sm:p-8">
              <h3 className="mb-6 text-xl font-bold text-foreground">
                Informasi Kontak
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email Resmi</div>
                    <a
                      href="mailto:dekan@posisi21media.id"
                      className="text-cyan-600 hover:underline dark:text-cyan-400"
                    >
                      dekan@posisi21media.id
                    </a>
                    <div className="text-xs text-muted-foreground">
                      Untuk urusan penelitian & editorial jurnal
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Kantor Riset</div>
                    <p className="text-muted-foreground">
                      Gedung Rektorat & Riset Terpadu, Lantai 3
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Fakultas Ilmu Komunikasi & Media Digital
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Jam Kerja</div>
                    <p className="text-muted-foreground">
                      Senin – Jumat: 08:30 – 16:30 WIB
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Sabtu & Minggu: Libur operasional
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Academic Platforms Card */}
            <div className="rounded-3xl border bg-card p-6 shadow-xs sm:p-8">
              <h3 className="mb-4 text-xl font-bold text-foreground">
                Profil Akademik & Riset
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Tautkan profil ilmiah untuk memantau pembaruan sitasi dan riwayat publikasi.
              </p>

              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border bg-background p-3.5 transition hover:border-cyan-500/50 hover:bg-muted/40"
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {link.name}
                      </div>
                      <div className="text-xs text-cyan-600 dark:text-cyan-400">
                        {link.handle}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16 rounded-3xl border bg-card p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <HelpCircle className="h-4 w-4 text-cyan-600" />
            Tanya Jawab Seputar Repositori
          </div>
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">
            Frequently Asked Questions (FAQ)
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl border bg-background p-6">
                <h4 className="mb-2 text-base font-semibold text-foreground">
                  {faq.q}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
