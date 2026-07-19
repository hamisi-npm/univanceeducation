import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import type { GlobalLayoutData } from "@/types/global-layout";

type MarketingShellProps = {
  children: ReactNode;
  /** When omitted (error/loading boundaries), render children without chrome. */
  global?: GlobalLayoutData;
};

export function MarketingShell({ children, global }: MarketingShellProps) {
  if (!global) {
    return <>{children}</>;
  }

  const { site, navigation, footer } = global;

  return (
    <>
      <SiteJsonLd site={site} />
      <LenisProvider>
        <Navbar site={site} navigation={navigation} />
        {children}
        <WhatsAppFloat phone={site.contact.phone} />
        <Footer content={footer} site={site} />
      </LenisProvider>
    </>
  );
}
