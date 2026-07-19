"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

import type { LenisOptions } from "lenis";

const lenisOptions = {
  lerp: 0.1,
  duration: 1,
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 1,
  wheelMultiplier: 1,
  anchors: true,
  stopInertiaOnNavigate: true,
  autoRaf: true,
} satisfies LenisOptions;

function LenisRouteSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisRouteSync />
      {children}
    </ReactLenis>
  );
}
