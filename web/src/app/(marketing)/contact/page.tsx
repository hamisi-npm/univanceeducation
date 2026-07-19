import { Container } from "@/components/layout/container";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import {
  ContactCta,
  ContactHero,
  ContactMethods,
  ConsultationForm,
  FaqPreview,
  OfficeHours,
  OfficeLocation,
} from "@/features/contact";
import type { ConsultationFormContent } from "@/features/contact/types";
import { createCmsPageMetadata } from "@/lib/metadata";
import { formatOfficeAddressInline } from "@/lib/format-office-address";
import { getContactPage } from "@/services/contact";
import { getSiteConfig } from "@/services/site";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const [contact, site] = await Promise.all([getContactPage(), getSiteConfig()]);
  const officeLine = formatOfficeAddressInline(site.office);

  return createCmsPageMetadata("/contact", contact.seo, {
    openGraph: {
      description: `Visit our office at ${officeLine}. Book a free study abroad consultation by phone, email, or WhatsApp.`,
    },
    other: {
      "business:contact_data:street_address": officeLine,
      "business:contact_data:locality": site.office.city,
      "business:contact_data:country_name": site.office.country,
    },
  });
}

function ConsultationFormSection({ content }: { content: ConsultationFormContent }) {
  return (
    <section
      id="consultation-form"
      aria-labelledby="consultation-form-heading"
      className={cn(
        sectionStyles.sectionBackground,
        sectionStyles.padding,
        "scroll-mt-24",
      )}
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className={cn(sectionStyles.header, "mb-10")}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {content.badge}
            </span>
            <h2 id="consultation-form-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ConsultationForm content={content} />
        </div>
      </Container>
    </section>
  );
}

export default async function ContactPage() {
  const contact = await getContactPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/contact" />
      <ContactHero content={contact.hero} />
      <ContactMethods content={contact.contactMethods} />
      <ConsultationFormSection content={contact.consultationForm} />
      <OfficeLocation content={contact.officeLocation} />
      <OfficeHours content={contact.officeHours} />
      <FaqPreview content={contact.faqPreview} />
      <ContactCta content={contact.cta} />
    </main>
  );
}
