import type { LegalSection } from "@/features/legal/types";

type PolicySectionProps = {
  section: LegalSection;
};

export function PolicySection({ section }: PolicySectionProps) {
  return (
    <section aria-labelledby={`${section.id}-heading`} className="space-y-4">
      <h2
        id={`${section.id}-heading`}
        className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
      >
        {section.heading}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
        {section.paragraphs.map((paragraph, index) => (
          <p
            key={`${section.id}-p-${index}`}
            className="text-pretty whitespace-pre-line"
          >
            {paragraph}
          </p>
        ))}
        {section.listItems ? (
          <ul className="list-disc space-y-2 pl-5">
            {section.listItems.map((item, index) => (
              <li key={`${section.id}-li-${index}`} className="text-pretty">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
