"use client";

import { useEffect } from "react";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { SystemPage } from "@/components/shared/system-page";
import { SystemPageActions } from "@/components/shared/system-page-actions";
import { Button } from "@/components/ui/button";
import { buttonStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  useEffect(() => {
    document.getElementById("global-error-heading")?.focus();
  }, []);

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", GeistSans.variable, GeistMono.variable)}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SystemPage
          badge="Application error"
          title="Something went wrong"
          description="A critical error prevented the site from loading. Please try again or contact us for assistance."
          headingId="global-error-heading"
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
      </body>
    </html>
  );
}
