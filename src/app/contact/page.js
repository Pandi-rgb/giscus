import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Research Repository for academic collaboration, publication questions, and professional research inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="mb-6 text-5xl font-bold">Contact</h1>

      <p className="text-muted-foreground">
        Contact information and social media links.
      </p>
    </main>
  );
}
