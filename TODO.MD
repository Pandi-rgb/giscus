# todo.md

# 🚀 Research Repository Website — Development Todo

## 1. Project Initialization

- [x] Setup Next.js (App Router + TypeScript)
- [x] Setup Tailwind CSS
- [x] Configure ESLint + Prettier
- [x] Configure absolute imports & aliases
- [x] Setup environment variables
- [x] Initialize Git repository

---

# 2. UI & Design System

- [x] Install and configure shadcn/ui
- [x] Install lucide-react icons
- [x] Create reusable UI components
  - [x] Navbar
  - [x] Footer
  - [x] Hero Section
  - [x] Article Card
  - [x] Search Input
  - [x] Buttons
  - [x] Form Components
- [x] Responsive layout (mobile/tablet/desktop)
- [x] Typography & spacing system

---

# 3. Database & Backend

- [x] Setup Supabase Project
- [x] Configure PostgreSQL Database
- [x] Install Prisma ORM
- [x] Configure Prisma Schema
- [x] Create database migrations

## Database Models

- [x] User/Admin
- [x] Articles
- [x] Categories
- [x] Tags
- [ ] Comments Metadata
- [x] Attachments/PDF

---

# 4. Authentication & Security

- [x] Setup Supabase Auth
- [x] Admin login page
- [x] Session management
- [x] Protected dashboard routes
- [x] Middleware authentication
- [ ] Role-based access (admin only)

---

# 5. Public Website Pages

## Landing Page

- [x] Hero section
- [x] Profile summary
- [x] Featured research/articles
- [x] Navigation menu
- [x] CTA buttons

## About Page

- [x] Full biography (basic placeholder)
- [ ] Academic background
- [ ] Research interests
- [ ] Experience section
- [ ] Profile image

## Articles Page

- [x] Article listing
- [x] Search feature
- [x] Pagination
- [x] Filter by category/tag
- [x] Sort articles

## Article Detail Page

- [x] Dynamic routing
- [x] Article content rendering
- [x] Metadata & SEO
- [x] PDF download button
- [x] Related articles
- [x] Reading time estimation

## Contact Page

- [x] Contact form (basic page placeholder)
- [ ] Social media links
- [ ] Email information
- [ ] Form validation

---

# 6. Admin Dashboard

- [x] Dashboard layout
- [x] Sidebar navigation
- [x] CRUD article management
- [x] Rich text editor integration
- [x] Upload featured image
- [x] Upload PDF file
- [x] Draft & publish system
- [x] Category management (basic integration)
- [x] Tag management

---

# 7. Content Management

- [ ] Integrate MDX support OR Tiptap editor
- [ ] Syntax highlighting
- [ ] Image embedding
- [ ] Mathematical formula rendering (KaTeX)
- [ ] Markdown support

---

# 8. File Storage

- [x] Configure Supabase Storage
- [x] PDF upload system
- [x] File access permissions
- [x] PDF download feature
- [ ] Optimize file naming structure

---

# 9. Search System

## MVP

## MVP

- [x] Client-side article search (fungsi belum jalan)
- [x] Keyword filtering

## Future Upgrade

- [ ] PostgreSQL Full Text Search
- [ ] Algolia integration

---

# 10. Comments & Discussion

- [ ] Integrate Giscus
- [ ] Configure GitHub Discussions
- [ ] Add comment section to article detail page

---

# 11. SEO & Performance

- [ ] Dynamic metadata
- [ ] OpenGraph support
- [ ] Twitter Card support
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Structured data (JSON-LD)
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Performance testing

---

# 12. Accessibility & UX

- [ ] Keyboard navigation
- [x] Semantic HTML
- [ ] Accessibility audit
- [x] Improve loading states
- [x] Empty states & error handling

---

# 13. Testing

- [ ] Unit testing
- [ ] Form validation testing
- [x] Authentication testing
- [x] CRUD testing
- [x] Responsive testing (manual real-device style testing sudah dilakukan)
- [ ] Cross-browser testing

---

# 14. Deployment

- [ ] Configure Vercel deployment
- [ ] Configure production environment variables
- [ ] Connect custom domain
- [ ] Setup analytics
- [ ] Setup monitoring/logging

---

# 15. Future Backlog

- [ ] Dark mode
- [ ] Multi-language support
- [ ] Citation generator
- [ ] DOI integration
- [ ] Research metrics/statistics
- [ ] Bookmark system
- [ ] Reading list
- [ ] Newsletter system
- [ ] AI-assisted search
- [ ] Recommendation engine

---

# Recommended Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react

## Backend

- Supabase
- Prisma ORM
- PostgreSQL

## Authentication

- Supabase Auth

## Storage

- Supabase Storage

## Forms & Validation

- react-hook-form
- zod

## Content Management

- MDX OR Tiptap Editor
- KaTeX
- rehype-highlight

## Discussion

- Giscus

## Deployment

- Vercel

# output.md

# 📘 Research Repository Website — Project Overview

## 1. Project Summary

Website ini dirancang sebagai platform arsip penelitian digital sekaligus profil profesional akademik. Pengguna dapat membaca, mencari, mengunduh, dan berdiskusi mengenai hasil penelitian yang dipublikasikan.

Selain menjadi media publikasi karya ilmiah, website ini juga berfungsi sebagai personal branding profesional dengan tampilan modern, minimalis, dan mudah diakses.

---

# 2. Main Objectives

## Untuk Pemilik Website

- Mempermudah pengelolaan hasil penelitian.
- Menyediakan dashboard admin yang sederhana.
- Menampilkan profil profesional secara modern.
- Menyimpan dan mengelola file penelitian digital.

## Untuk Pengunjung

- Membaca artikel penelitian dengan nyaman.
- Mencari penelitian berdasarkan kata kunci.
- Mengunduh file PDF penelitian.
- Berinteraksi melalui sistem diskusi.

---

# 3. Website Structure

## Home Page

Halaman utama yang menampilkan:

- Foto profil
- Nama dan profesi
- Ringkasan singkat
- Highlight penelitian terbaru
- Navigasi utama

## About Page

Berisi informasi lengkap mengenai:

- Biodata
- Riwayat pendidikan
- Pengalaman
- Minat penelitian
- Portofolio akademik

## Articles Page

Berfungsi sebagai perpustakaan digital penelitian:

- Daftar artikel
- Search artikel
- Filter kategori/tag
- Pagination
- Thumbnail dan metadata artikel

## Article Detail Page

Halaman detail penelitian:

- Isi artikel lengkap
- PDF download
- Metadata penelitian
- Related articles
- Kolom diskusi

## Contact Page

Mempermudah komunikasi:

- Formulir kontak
- Email
- Social media
- Informasi profesional lainnya

## Admin Dashboard

Area khusus admin untuk:

- Menambah artikel
- Mengedit artikel
- Menghapus artikel
- Mengunggah PDF
- Mengatur kategori/tag
- Mengelola publikasi

---

# 4. User Experience

## Admin Experience

### Simple Content Management

Dashboard dibuat sederhana agar pengelolaan konten terasa seperti mengisi formulir biasa.

### Full Control

Admin memiliki kontrol penuh terhadap artikel dan file penelitian.

### Secure Access

Hanya admin yang dapat mengakses dashboard melalui authentication system.

---

## Visitor Experience

### Professional Appearance

Desain minimalis memberikan kesan profesional dan akademik.

### Easy Navigation

Struktur website dibuat sederhana dan mudah dipahami.

### Interactive Features

Pengunjung dapat:

- Membaca artikel
- Mengunduh PDF
- Mencari topik penelitian
- Berdiskusi melalui komentar

---

# 5. Technology Stack

## Frontend

### Next.js

Digunakan untuk membangun website modern dengan:

- SEO friendly
- Fast rendering
- Dynamic routing
- Fullstack capability

### Tailwind CSS

Digunakan untuk:

- Responsive design
- Modern UI styling
- Fast development
- Consistent design system

### shadcn/ui

Digunakan untuk:

- Reusable UI components
- Professional dashboard appearance
- Faster UI development

---

## Backend & Database

### Supabase

Digunakan sebagai:

- PostgreSQL database
- Authentication system
- File storage
- Backend services

### Prisma ORM

Digunakan untuk:

- Database query management
- Type-safe database operations
- Easier CRUD development

---

## Authentication

### Supabase Auth

Digunakan untuk:

- Admin login
- Session management
- Route protection
- Secure dashboard access

---

## Storage

### Supabase Storage

Digunakan untuk:

- Upload PDF penelitian
- File management
- Secure download system

---

## Content Management

### MDX / Tiptap Editor

Digunakan agar:

- Penulisan artikel lebih fleksibel
- Mendukung rich text
- Mendukung markdown
- Mendukung formula matematika
- Mendukung syntax highlighting

---

## Discussion System

### Giscus

Digunakan untuk:

- Kolom komentar artikel
- Integrasi GitHub Discussions
- Sistem diskusi gratis dan aman

---

## Deployment

### Vercel

Digunakan untuk:

- Deployment Next.js
- Auto deployment dari GitHub
- Hosting modern dan scalable

---

# 6. Security & Performance

## Security

- Authentication system
- Protected admin routes
- Secure file access
- Environment variables
- Role-based access control

## Performance

- Image optimization
- Lazy loading
- SEO optimization
- Fast rendering
- Responsive design

---

# 7. SEO Strategy

Website akan dioptimalkan agar mudah ditemukan di mesin pencari:

- Dynamic metadata
- Sitemap
- OpenGraph support
- Structured data
- Semantic HTML
- SEO-friendly URLs

---

# 8. Future Development Roadmap

## Phase 1 — MVP

- Landing page
- About page
- Articles page
- Detail article page
- Contact page
- Admin dashboard
- PDF upload/download
- Giscus comments

## Phase 2 — Enhancement

- Dark mode
- Category & tagging system
- Improved search
- Better analytics
- Reading statistics

## Phase 3 — Advanced Features

- DOI integration
- Citation generator
- AI-assisted search
- Recommendation system
- Multi-language support

---

# 9. Final Summary

Website ini dirancang sebagai perpustakaan digital penelitian sekaligus profil profesional akademik yang modern, aman, dan mudah digunakan.

Dengan kombinasi teknologi modern seperti Next.js, Supabase, Prisma, dan Tailwind CSS, website mampu memberikan:

- Pengalaman pengguna yang profesional
- Pengelolaan konten yang mudah
- Performa cepat
- Skalabilitas tinggi
- SEO yang baik
- Sistem arsip penelitian yang terstruktur

Hasil akhirnya adalah platform profesional yang memudahkan publikasi, pengelolaan, dan distribusi hasil penelitian digital secara efektif.
