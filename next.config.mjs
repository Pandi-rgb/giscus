/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rjxekvlnagtefebcmqwa.supabase.co",
      },
    ],
  },
};

export default nextConfig;
