import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { NavbarScrollShell } from "@/components/layout/navbar-scroll-shell";
import { Button } from "@/components/ui/button";
import { buttonStyles } from "@/lib/section-styles";
import type { NavCta, NavItem } from "@/types/navigation";
import type { SiteConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type NavbarProps = {
  site: SiteConfig;
  navigation: {
    items: NavItem[];
    cta: NavCta;
  };
};

export function Navbar({ site, navigation }: NavbarProps) {
  const { items, cta } = navigation;

  return (
    <NavbarScrollShell>
      <Container>
        <nav
          className="flex h-16 items-center justify-between gap-6"
          aria-label="Main navigation"
        >
          <Logo site={site} priority />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.title}</NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden h-9 px-4 text-xs font-semibold md:inline-flex",
                buttonStyles.gold,
              )}
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
            <MobileNav items={items} cta={cta} />
          </div>
        </nav>
      </Container>
    </NavbarScrollShell>
  );
}
