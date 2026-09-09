# 🏛️ Research Repository Website — Struktur & Arsitektur Proyek

Dokumentasi komprehensif struktur file, basis data, alur autentikasi, dan konfigurasi sistem untuk website **Research Repository ("Posisi 21 Media")**.

---

## 1. Ikhtisar Proyek

- **Nama Proyek:** Posisi 21 Media — Digital Research Repository
- **Fungsi Utama:** Perpustakaan digital artikel penelitian ilmiah, makalah konferensi, profil akademik pimpinan (Dekan), serta manajemen publikasi berbasis dashboard admin.
- **Teknologi Utama:**
  - **Framework:** Next.js 16 (App Router + Turbopack)
  - **Bahasa:** JavaScript (ESM) & TypeScript (Prisma Client)
  - **Styling:** Tailwind CSS v4 + tw-animate-css + shadcn/ui
  - **Database & ORM:** PostgreSQL (Supabase) + Prisma ORM v6
  - **Autentikasi & Storage:** Supabase Auth (SSR) & Supabase Storage
  - **Rich Text Editor:** Tiptap Editor (KaTeX Math, Lowlight Code Highlight, Image Embedding)
  - **Komentar:** Giscus (GitHub Discussions Integration)
  - **Notifikasi:** Sonner Toaster

---

## 2. Struktur Direktori Proyek

```plaintext
research-repository/
├── .env                         # Konfigurasi database PostgreSQL & Supabase API
├── .env.local                   # Konfigurasi Giscus repository & discussion
├── components.json              # Konfigurasi shadcn/ui
├── next.config.mjs              # Konfigurasi Next.js
├── package.json                 # Daftar dependensi dan script npm
├── prisma/
│   ├── schema.prisma            # Definisi model data PostgreSQL
│   └── seed.js                  # Skrip inisialisasi kategori awal
├── public/
│   └── LOGO_HITAM.png           # Aset logo resmi Posisi 21 Media
├── src/
│   ├── proxy.js                 # Next.js 16 Proxy / Middleware untuk proteksi rute /dashboard
│   ├── app/                     # Next.js App Router (Rute & Halaman)
│   │   ├── layout.js            # Root layout, font, Toaster, Navbar, Footer
│   │   ├── globals.css          # Desain tema, token warna (#0f2027, #203a43, #2c5364), KaTeX
│   │   ├── page.js              # Halaman Beranda (Landing Page & Publikasi Unggulan)
│   │   ├── about/
│   │   │   └── page.js          # Profil Akademik, Minat Riset, Riwayat Pendidikan & Karier
│   │   ├── contact/
│   │   │   ├── page.js          # Informasi Kontak Resmi, Media Sosial Riset, FAQ
│   │   │   └── contact-form.js  # Komponen interaktif formulir kontak & validasi
│   │   ├── articles/
│   │   │   ├── page.js          # Direktori & Pencarian Artikel dengan filter kategori/tag/sort
│   │   │   └── [slug]/
│   │   │       └── page.js      # Halaman Baca Artikel Lengkap, PDF Download, dan Giscus Comments
│   │   ├── login/
│   │   │   └── page.js          # Halaman Login Admin berbasis Supabase Auth
│   │   ├── dashboard/           # Area Khusus Admin (Terproteksi)
│   │   │   ├── layout.js        # Layout Dashboard dengan Sidebar Navigasi
│   │   │   ├── page.js          # Ringkasan Metrik (Total, Published, Draft) & Tabel Artikel
│   │   │   └── articles/
│   │   │       ├── new/
│   │   │       │   └── page.js  # Halaman Tulis Artikel Baru
│   │   │       └── [id]/edit/
│   │   │           └── page.js  # Halaman Edit Artikel yang Telah Ada
│   │   ├── api/                 # Endpoint REST API Internal
│   │   │   ├── articles/
│   │   │   │   ├── route.js     # POST: Tambah artikel baru + dynamic author resolver
│   │   │   │   └── [id]/
│   │   │   │       └── route.js # PUT: Update artikel (draft/published), DELETE: Hapus artikel
│   │   │   └── auth/admin/
│   │   │       └── route.js     # GET: Verifikasi sesi admin aktif
│   │   ├── robots.js            # Generator otomatis robots.txt untuk SEO
│   │   └── sitemap.js           # Generator dinamis sitemap.xml
│   ├── components/              # Komponen Reusable
│   │   ├── article/
│   │   │   ├── article-card.js  # Kartu tampilan ringkas artikel
│   │   │   ├── article-content.js # Renderer konten Tiptap (KaTeX + Syntax Highlighting)
│   │   │   ├── article-search.js  # Pencarian debounced, filter select, dan tombol reset
│   │   │   └── giscus-comments.js # Wadah diskusi komentar Giscus
│   │   ├── dashboard/
│   │   │   ├── article-form.js  # Form penambahan artikel (Cover, PDF, Tiptap, Draft/Publish)
│   │   │   ├── edit-article-form.js # Form pembaruan artikel
│   │   │   ├── dashboard-sidebar.js # Navigasi admin dengan fungsi logout Supabase
│   │   │   ├── delete-article-button.js # Tombol hapus artikel dengan konfirmasi
│   │   │   ├── rich-text-editor.js  # Inisialisasi Tiptap Rich Text Editor
│   │   │   └── editor-toolbar.js    # Toolbar tombol pemformatan teks, rumus, kode
│   │   ├── layout/
│   │   │   ├── navbar.js        # Navigasi utama dengan scroll detection & mobile drawer
│   │   │   └── footer.js        # Footer dengan informasi repositori, navigasi, dan hak cipta
│   │   └── ui/                  # Komponen basis shadcn/ui (Button, Input, Card, Toaster, dll)
│   └── lib/                     # Utilitas & Konfigurasi Eksternal
│       ├── auth.js              # Helper verifikasi hak akses admin
│       ├── prisma.ts            # Singleton PrismaClient
│       ├── seo.js               # Helper metadata OpenGraph, Twitter, dan Schema.org
│       ├── utils.js             # Utilitas kelas Tailwind (cn / clsx / twMerge)
│       └── supabase/
│           ├── client.js        # Supabase browser client
│           ├── server.js        # Supabase server client (cookies SSR)
│           ├── storage.js       # Helper upload berkas PDF ke bucket Supabase
│           └── upload-cover.js  # Helper upload gambar sampul ke bucket Supabase
```

---

## 3. Skema Basis Data (Prisma ORM)

Relasi antar-entitas didefinisikan dalam `prisma/schema.prisma`:

### Model: `User`
- Menyimpan kredensial admin dan akun pengelola konten.
- Fields: `id`, `email` (unique), `name`, `role` (`Role.ADMIN`), `createdAt`, `updatedAt`.
- Relasi: One-to-Many ke `Article`.

### Model: `Article`
- Menyimpan naskah artikel ilmiah dan penelitian.
- Fields: `id`, `title`, `slug` (unique), `excerpt`, `content` (HTML Tiptap), `coverImage`, `published` (Boolean: draft/published), `createdAt`, `updatedAt`.
- Relasi:
  - Many-to-One ke `User` (`author`).
  - Many-to-One ke `Category` (opsional).
  - Many-to-Many ke `Tag`.
  - One-to-One ke `Attachment` (PDF lampiran).

### Model: `Category`
- Klasifikasi karya ilmiah (misal: "Artikel", "Jurnal", "Kajian Kebijakan").
- Fields: `id`, `name` (unique), `slug` (unique).

### Model: `Tag`
- Label kata kunci topik penelitian (misal: "AI", "Jurnalisme", "Etika").
- Fields: `id`, `name` (unique), `slug` (unique).

### Model: `Attachment`
- Berkas dokumen penelitian lengkap dalam format PDF.
- Fields: `id`, `fileName`, `fileUrl`, `articleId` (unique), `createdAt`.

---

## 4. Alur Autentikasi & Keamanan

1. **Proteksi Dashboard (`src/proxy.js`)**:
   - Seluruh rute di bawah `/dashboard/:path*` dicegat oleh Proxy Next.js 16.
   - Sesi diverifikasi melalui Supabase SSR Cookies (`getUser()`).
   - Apabila pengguna belum terautentikasi, sistem otomatis mengalihkan ke `/login?redirect=/dashboard...`.
2. **Login Admin (`/login`)**:
   - Autentikasi langsung menggunakan Supabase Auth client (`signInWithPassword`).
   - Dilengkapi penampil kata sandi (show/hide password) dan pesan kesalahan interaktif.
3. **Logout Admin**:
   - Tombol "Keluar" pada Sidebar Dashboard memanggil `supabase.auth.signOut()` secara menyeluruh, membersihkan cookies sesi, menampilkan konfirmasi Sonner toast, dan mengembalikan user ke halaman login.

---

## 5. Fitur Halaman Publik

1. **Beranda (`/`)**:
   - Hero banner dengan branding resmi Posisi 21 Media.
   - Ringkasan profil dan metrik arsip riset (artikel terindeks, dokumen PDF, status Open Access).
   - Tiga artikel terbaru dengan kartu interaktif.
2. **Tentang Kami (`/about`)**:
   - Profil lengkap Dekan dan Peneliti Utama.
   - Garis waktu riwayat pendidikan formal (S1, S2, S3/Doktor).
   - Matriks fokus minat penelitian dan tag keilmuan.
   - Rekam jejak pengalaman profesional, kepemimpinan akademik, dan editorial jurnal.
   - Call-to-action kolaborasi riset.
3. **Daftar Artikel (`/articles`)**:
   - Pencarian judul/topik otomatis dengan *debouncing* 350ms.
   - Filter dropdown kategori, tag kata kunci, dan pengurutan (Terbaru, Terlama, Abjad A-Z).
   - Tombol **Reset Filter** ketika ada penyaringan aktif.
   - Penomoran halaman (Pagination) server-side.
4. **Detail Artikel (`/articles/[slug]`)**:
   - Rendering tipografi artikel yang nyaman dibaca dengan dukungan KaTeX dan cuplikan kode pemrograman.
   - Tombol unduh dokumen resmi PDF penelitian.
   - Kolom diskusi pembaca berbasis Giscus (GitHub Discussions).
   - Rekomendasi 3 artikel terkait.
5. **Kontak & Hubungan Akademik (`/contact`)**:
   - Formulir pesan interaktif dengan validasi email dan notifikasi keberhasilan.
   - Alamat kantor riset, email resmi institusional, dan jam operasional.
   - Tautan profil akademik (Google Scholar, ORCID, LinkedIn, GitHub).
   - FAQ seputar hak akses dan sitasi karya ilmiah.

---

## 6. Panduan Menjalankan Proyek

### Mode Development
```powershell
cmd /c "npm run dev"
```
Aplikasi dapat diakses pada `http://localhost:3000`.

### Build Produksi
```powershell
cmd /c "npm run build"
```
Membuat artefak rute statis dan SSR yang dioptimalkan Turbopack.

### Menjalankan Server Produksi
```powershell
cmd /c "npm run start"
```
