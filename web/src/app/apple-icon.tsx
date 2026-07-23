import { renderBrandIcon } from "@/lib/brand-icon";
import { getSiteConfig } from "@/services/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  let imageSrc = "";

  try {
    const site = await getSiteConfig();
    imageSrc = site.faviconUrl || site.logo.src;
  } catch {
    // Dataset may be empty — use monogram fallback.
  }

  return renderBrandIcon({
    size: size.width,
    borderRadius: 36,
    fontSize: 52,
    imageSrc: imageSrc || undefined,
  });
}
