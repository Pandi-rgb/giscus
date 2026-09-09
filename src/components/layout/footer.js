import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/LOGO_HITAM.png";
import { BookOpen, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gradient-to-b from-Secondary/90 to-Primary text-slate-300">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="Posisi 21 Media"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm text-slate-400">
              Platform publikasi karya ilmiah, telaah konvergensi media, etika digital,
              dan repositori penelitian terbuka bagi sivitas akademika dan masyarakat luas.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Open Access Academic Repository
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition">
                  Beranda (Home)
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-cyan-300 transition">
                  Daftar Artikel (Articles)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition">
                  Profil & Minat Riset (About)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition">
                  Kontak & Kolaborasi (Contact)
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Sistem & Kelola
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-cyan-300 transition">
                  Dashboard Admin
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-300 transition">
                  Masuk Akun (Login)
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Pandi-rgb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {year} Posisi 21 Media Research Repository. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dirancang untuk diseminasi ilmu pengetahuan terbuka
          </p>
        </div>
      </div>
    </footer>
  );
}
