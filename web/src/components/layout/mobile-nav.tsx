"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import { NavLink } from "@/components/layout/nav-link";
import { useNavbarScroll } from "@/components/layout/navbar-scroll-shell";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonStyles } from "@/lib/section-styles";
import type { NavCta, NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  items: NavItem[];
  cta: NavCta;
};

export function MobileNav({ items, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { scrolled } = useNavbarScroll();

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "lg:hidden",
            scrolled
              ? "text-foreground hover:bg-muted"
              : "text-white hover:bg-white/10 hover:text-white",
          )}
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader className="border-b border-border pb-4 text-left">
          <SheetTitle className="text-base">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main site navigation links
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="flex flex-1 flex-col px-4">
          <ul className="flex flex-col gap-1 py-4">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  tone="dark"
                  onNavigate={closeSheet}
                  className="block rounded-md px-3 py-3 text-base"
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter className="border-t border-border pt-4">
          <Button
            asChild
            className={cn("h-11 w-full text-sm font-semibold", buttonStyles.gold)}
            size="lg"
          >
            <Link href={cta.href} onClick={closeSheet}>
              {cta.label}
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
