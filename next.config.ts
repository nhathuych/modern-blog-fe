import type { NextConfig } from "next";

const supabaseDomain = new URL(process.env.SUPABASE_PROJECT_URL!).hostname;

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: [supabaseDomain, 'loremflickr.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
