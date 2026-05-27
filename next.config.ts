import type { NextConfig } from "next";

const SECTION_SLUGS = ["about", "fits", "beyond", "agency", "contact", "testimonials"];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return SECTION_SLUGS.map(slug => ({
      source: `/${slug}`,
      destination: "/",
    }));
  },
};

export default nextConfig;
