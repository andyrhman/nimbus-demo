/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    siteDescription: "Demo Website for Nimbus Travel Recommendation App",
    siteKeywords: "Travel, Recommendation, Education",
    siteUrl: "http://localhost:3000",
    siteTitle: "Nimbus Demo"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ]
  }
};

export default nextConfig;