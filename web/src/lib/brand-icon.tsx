import { ImageResponse } from "next/og";

import { brandColors } from "@/config/brand";

type BrandIconOptions = {
  size: number;
  borderRadius: number;
  fontSize: number;
  /** Absolute Sanity CDN URL for favicon or logo. */
  imageSrc?: string;
  /** Used for the monogram fallback when no image is available. */
  label?: string;
};

/**
 * Renders a square brand icon for `/icon` and `/apple-icon`.
 * Prefers the CMS image; falls back to a maroon "UE" monogram.
 */
export function renderBrandIcon({
  size,
  borderRadius,
  fontSize,
  imageSrc,
  label = "UE",
}: BrandIconOptions) {
  if (imageSrc) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: brandColors.white,
            borderRadius,
          }}
        >
          <img
            src={imageSrc}
            alt=""
            width={Math.round(size * 0.82)}
            height={Math.round(size * 0.82)}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      ),
      { width: size, height: size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.primary,
          borderRadius,
          color: brandColors.white,
          fontSize,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {label}
      </div>
    ),
    { width: size, height: size },
  );
}
