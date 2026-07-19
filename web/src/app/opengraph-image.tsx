import { ImageResponse } from "next/og";

import { brandColors } from "@/config/brand";
import { getSiteConfig } from "@/services/site";

export const alt = "Univance Education";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let name = "Univance Education";
  let tagline = "Your Future, Our Commitment";

  try {
    const site = await getSiteConfig();
    name = site.name;
    tagline = site.tagline;
  } catch {
    // Dataset may be empty during first deploy.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${brandColors.neutral} 0%, #ffffff 50%, ${brandColors.neutral} 100%)`,
          color: brandColors.footer,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            color: brandColors.primary,
          }}
        >
          {name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 900,
              color: brandColors.footer,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: brandColors.secondary,
              maxWidth: 800,
            }}
          >
            University selection, applications, visas, and scholarships
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
