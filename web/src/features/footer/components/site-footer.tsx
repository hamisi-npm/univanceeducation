import { Container } from "@/components/layout/container";
import { FooterBrand } from "@/features/footer/components/footer-brand";
import { FooterBottomBar } from "@/features/footer/components/footer-bottom-bar";
import { FooterContact } from "@/features/footer/components/footer-contact";
import { FooterNavGroup } from "@/features/footer/components/footer-nav-group";
import { FooterNewsletter } from "@/features/footer/components/footer-newsletter";
import type { FooterContent } from "@/features/footer/types";
import type { SiteConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  content: FooterContent;
  site: SiteConfig;
  className?: string;
};

export function SiteFooter({ content, site, className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "relative mt-auto bg-footer text-footer-foreground",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-footer-accent/50"
      />

      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-14 lg:gap-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-14 xl:gap-20">
            <FooterBrand
              brand={content.brand}
              social={content.social}
              site={site}
              className="lg:max-w-sm lg:shrink-0"
            />

            <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
              {content.navGroups.map((group) => (
                <FooterNavGroup key={group.id} group={group} />
              ))}
              <FooterContact contact={content.contact} />
            </div>
          </div>

          <FooterNewsletter content={content.newsletter} />
          <FooterBottomBar content={content.bottomBar} siteName={site.name} />
        </div>
      </Container>
    </footer>
  );
}
