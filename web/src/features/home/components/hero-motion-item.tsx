"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type HeroMotionItemProps = {
  children: ReactNode;
  index: number;
  className?: string;
};

const delays = [0, 0.08, 0.16, 0.24, 0.32, 0.2, 0.5, 0.6] as const;

export function HeroMotionItem({
  children,
  index,
  className,
}: HeroMotionItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = delays[index] ?? index * 0.08;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: index >= 5 ? 8 : 16,
        ...(index === 5 ? { scale: 0.98 } : {}),
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: index >= 5 ? 0.5 : 0.45,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
