"use client";

import { useEffect } from "react";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { SystemPage } from "@/components/shared/system-page";
import { SystemPageActions } from "@/components/shared/system-page-actions";
import { Button } from "@/components/ui/button";
import { buttonStyles } from "@/lib/section-styles";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  useEffect(() => {
    document.getElementById("error-heading")?.focus();
  }, []);

  return (
    <MarketingShell>
      <SystemPage
        badge="Something went wrong"
        title="We could not load this page"
        description="An unexpected error occurred. Please try again, return home, or contact us if the problem continues."
        headingId="error-heading"
        actions={
          <>
            <Button
              type="button"
              size="lg"
              className={buttonStyles.responsiveLg}
              onClick={() => reset()}
            >
              Try again
            </Button>
            <SystemPageActions />
          </>
        }
      />
    </MarketingShell>
  );
}
