import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'dummyimage.com',
      'cloud.appwrite.io',
      'aceternity.com',          
      'assets.aceternity.com',   
      'picsum.photos', 
      'images.unsplash.com',
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
