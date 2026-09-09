export const siteConfig = {
  name: "Posisi 21 Media",
  description:
    "Portal berita dan artikel terpercaya menyajikan informasi terkini, liputan mendalam, opini kredibel, dan jurnalisme berkualitas.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  images = [],
  type = "website",
} = {}) {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = absoluteUrl(path);

  return {
    title: resolvedTitle,
    description,
    icons: {
      icon: "/LOGO_HITAM.png",
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description,
      images,
    },
  };
}
