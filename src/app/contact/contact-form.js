"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "research-collab",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Mohon lengkapi semua kolom yang wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Format alamat email tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim pesan.");
      }

      setSubmitted(true);
      toast.success("Pesan Anda telah berhasil terkirim ke email pengelola!");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(error.message || "Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFormData({
      name: "",
      email: "",
      subject: "research-collab",
      message: "",
    });
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-50/50 p-10 text-center dark:bg-emerald-950/20">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-foreground">
          Pesan Terkirim dengan Sukses
        </h3>
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          Terima kasih telah menghubungi kami. Kami akan meninjau pesan Anda dan
          merespons melalui email <strong>{formData.email}</strong> sesegera mungkin.
        </p>
        <Button onClick={handleReset} variant="outline">
          Kirim Pesan Lainnya
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border bg-card p-8 shadow-xs md:p-10"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">Kirim Pesan</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Silakan isi formulir di bawah ini untuk konsultasi, kolaborasi, atau kueri penelitian.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Dr. Budi Santoso"
            required
            className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Alamat Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="budi@universitas.ac.id"
            required
            className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Topik / Keperluan <span className="text-red-500">*</span>
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
        >
          <option value="research-collab">Kolaborasi Riset & Penulisan Ilmiah</option>
          <option value="publication-inquiry">Pertanyaan Publikasi & Dokumen PDF</option>
          <option value="speaking-invitation">Undangan Seminar / Narasumber / Kuliah Tamu</option>
          <option value="peer-review">Permohonan Peer Reviewer Jurnal</option>
          <option value="general">Kueri Umum & Lainnya</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tuliskan latar belakang, maksud, atau detail pesan Anda di sini..."
          required
          className="w-full resize-y rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-600 py-3 text-white hover:bg-cyan-500 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Mengirim Pesan...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Kirim Pesan Sekarang
          </>
        )}
      </Button>
    </form>
  );
}
