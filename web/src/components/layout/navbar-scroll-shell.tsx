"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type NavbarScrollShellProps = {
  children: ReactNode;
};

export function NavbarScrollShell({ children }: NavbarScrollShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
