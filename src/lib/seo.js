export const siteConfig = {
  name: "Research Repository",
  description:
    "A modern digital archive for publishing, managing, and exploring academic research and professional works.",
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
  const resolvedTitle = title || siteConfig.name;
  const url = absoluteUrl(path);

  return {
    title: resolvedTitle,
    description,
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
