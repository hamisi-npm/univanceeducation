"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { focusRing, linkTransition } from "@/lib/section-styles";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ href, children, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2 text-sm",
        linkTransition,
        focusRing,
        active
          ? "bg-muted/80 font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
