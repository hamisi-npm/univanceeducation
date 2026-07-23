"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useNavbarScroll } from "@/components/layout/navbar-scroll-shell";
import { cn } from "@/lib/utils";
import { focusRing, linkTransition } from "@/lib/section-styles";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
  /** Force light-on-dark or dark-on-light styles (e.g. mobile sheet). */
  tone?: "auto" | "light" | "dark";
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  href,
  children,
  className,
  onNavigate,
  tone = "auto",
}: NavLinkProps) {
  const pathname = usePathname();
  const { scrolled } = useNavbarScroll();
  const active = isActivePath(pathname, href);
  const useDark =
    tone === "dark" || (tone === "auto" && scrolled);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium",
        linkTransition,
        focusRing,
        useDark
          ? active
            ? "bg-primary/5 font-semibold text-primary"
            : "text-foreground/80 hover:bg-muted/60 hover:text-brand-navy"
          : active
            ? "bg-white/15 font-semibold text-white"
            : "text-white/90 hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}
