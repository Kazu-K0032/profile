import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // public配下の静的アセット
        source: "/:all*(svg|png|ico)",
        headers: [
          {
            key: "Cache-Control",
            // 1年間キャッシュ(365d*24h*60m*60s=31536000)
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
