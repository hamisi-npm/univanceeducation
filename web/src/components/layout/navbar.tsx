import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { NavbarScrollShell } from "@/components/layout/navbar-scroll-shell";
import { Button } from "@/components/ui/button";
import type { NavCta, NavItem } from "@/types/navigation";
import type { SiteConfig } from "@/types/site";

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
          className="flex h-14 items-center justify-between gap-6"
          aria-label="Main navigation"
        >
          <Logo site={site} priority />

          <ul className="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} className="rounded-md px-3 py-2">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden h-8 px-4 text-xs md:inline-flex"
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
