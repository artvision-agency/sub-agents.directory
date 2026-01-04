/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      // GitHub avatars
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      // YouTube thumbnails
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Brand logos (Brandfetch CDN)
      { protocol: "https", hostname: "cdn.brandfetch.io" },
      // Twitter/X images
      { protocol: "https", hostname: "pbs.twimg.com" },
      // SettleMint
      { protocol: "https", hostname: "console.settlemint.com" },
    ],
  },
};

export default nextConfig;
