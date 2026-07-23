import { renderBrandIcon } from "@/lib/brand-icon";
import { getSiteConfig } from "@/services/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  let imageSrc = "";

  try {
    const site = await getSiteConfig();
    imageSrc = site.faviconUrl || site.logo.src;
  } catch {
    // Dataset may be empty — use monogram fallback.
  }

  return renderBrandIcon({
    size: size.width,
    borderRadius: 8,
    fontSize: 13,
    imageSrc: imageSrc || undefined,
  });
}
