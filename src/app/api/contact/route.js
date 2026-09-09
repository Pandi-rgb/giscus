import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * ============================================================================
 * KONFIGURASI EMAIL TUJUAN
 * ============================================================================
 * Anda dapat mengubah alamat email tujuan di bawah ini atau melalui file `.env`:
 * CONTACT_RECEIVER_EMAIL="email-anda@gmail.com"
 */
const DEFAULT_RECEIVER_EMAIL =
  process.env.CONTACT_RECEIVER_EMAIL || "mohsahrilapandi@gmail.com";

const SUBJECT_LABELS = {
  "research-collab": "Kolaborasi Riset & Penulisan Ilmiah",
  "publication-inquiry": "Pertanyaan Publikasi & Dokumen PDF",
  "speaking-invitation": "Undangan Seminar / Narasumber / Kuliah Tamu",
  "peer-review": "Permohonan Peer Reviewer Jurnal",
  general: "Kueri Umum & Lainnya",
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format alamat email tidak valid." },
        { status: 400 },
      );
    }

    const subjectLabel = SUBJECT_LABELS[subject] || subject || "Pesan Baru";
    const receiverEmail = DEFAULT_RECEIVER_EMAIL;

    // Template email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0f2027; margin: 0 0 4px 0;">Pesan Baru dari Repositori Riset</h2>
          <p style="color: #64748b; font-size: 13px; margin: 0;">Posisi 21 Media — Formulir Kontak Akademik</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 130px;"><strong>Pengirim:</strong></td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Email Balasan:</strong></td>
            <td style="padding: 8px 0; color: #0284c7; font-size: 14px;">
              <a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Topik Keperluan:</strong></td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">
              <span style="background-color: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold;">
                ${subjectLabel}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Waktu Kirim:</strong></td>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${new Date().toLocaleString("id-ID")}</td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border-left: 4px solid #06b6d4; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 13px; text-transform: uppercase;">Isi Pesan:</h4>
          <p style="color: #1e293b; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
          <p style="margin: 0;">Email ini otomatis diteruskan dari formulir kontak website <strong>Posisi 21 Media</strong>.</p>
          <p style="margin: 4px 0 0 0;">Anda dapat membalas langsung pengirim dengan menekan tombol <em>Reply</em> di aplikasi email Anda.</p>
        </div>
      </div>
    `;

    // 1. OPSI A: Jika menggunakan Resend API Key
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.EMAIL_FROM || "Posisi 21 Media <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: email,
          subject: `[Kontak Riset] ${subjectLabel} - dari ${name}`,
          html: emailHtml,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error("Resend API error:", errorData);
        throw new Error(errorData.message || "Gagal mengirim melalui Resend");
      }

      return NextResponse.json({ success: true, method: "resend" });
    }

    // 2. OPSI B: Jika menggunakan SMTP (Gmail, Outlook, Webmail cPanel)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name} (via Posisi 21 Media)" <${process.env.SMTP_USER}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `[Kontak Riset] ${subjectLabel} - dari ${name}`,
        html: emailHtml,
        text: `Pengirim: ${name} (${email})\nTopik: ${subjectLabel}\n\nPesan:\n${message}`,
      });

      return NextResponse.json({ success: true, method: "smtp" });
    }

    // 3. OPSI C: Mode Simulasi / Logging (Jika kredensial email belum diisi di .env)
    console.log("=================================================");
    console.log("📬 [PESAN FORMULIR KONTAK DITERIMA]");
    console.log(`Pengirim : ${name} <${email}>`);
    console.log(`Topik    : ${subjectLabel}`);
    console.log(`Ke Email : ${receiverEmail}`);
    console.log(`Waktu    : ${new Date().toLocaleString("id-ID")}`);
    console.log(`Pesan    : \n${message}`);
    console.log("=================================================");
    console.log(
      "💡 Tips: Untuk mengirimkan pesan ini langsung ke inbox email asli, tambahkan RESEND_API_KEY atau SMTP_USER & SMTP_PASS di file .env",
    );

    return NextResponse.json({
      success: true,
      simulated: true,
      message:
        "Pesan berhasil diterima server. Untuk pengiriman langsung ke inbox email fisik, lengkapi RESEND_API_KEY atau SMTP_USER di file .env.",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Gagal mengirim email: " + error.message },
      { status: 500 },
    );
  }
}
