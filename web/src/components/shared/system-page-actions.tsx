import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buttonStyles } from "@/lib/section-styles";

export function SystemPageActions() {
  return (
    <>
      <Button asChild size="lg" className={buttonStyles.responsiveLg}>
        <Link href="/">Back to Home</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className={buttonStyles.responsiveOutline}
      >
        <Link href="/contact">Contact Us</Link>
      </Button>
    </>
  );
}
