import Image from "next/image";
import Link from "next/link";

import { focusRing, linkTransition } from "@/lib/section-styles";
import type { SiteConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "footer" | "hero";

type LogoProps = {
  site: SiteConfig;
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

function getVariantConfig(site: SiteConfig, variant: LogoVariant) {
  const { logo } = site;

  switch (variant) {
    case "footer":
      return {
        src: logo.srcLight || logo.src,
        className: "h-9 w-auto",
        width: logo.width,
        height: logo.height,
      };
    case "hero":
      return {
        src: logo.src,
        className: "h-10 w-auto sm:h-11",
        width: logo.width,
        height: logo.height,
      };
    default:
      return {
        src: logo.src,
        className: "h-8 w-auto sm:h-9",
        width: logo.width,
        height: logo.height,
      };
  }
}

export function Logo({
  site,
  variant = "default",
  className,
  priority = false,
}: LogoProps) {
  const config = getVariantConfig(site, variant);
  const src = config.src.trim();
  const isRemote = src.startsWith("http");

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center rounded-md",
        linkTransition,
        focusRing,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={site.logo.alt}
          width={config.width || 1}
          height={config.height || 1}
          unoptimized={!isRemote}
          className={cn("object-contain object-left", config.className)}
          priority={priority}
        />
      ) : null}
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
