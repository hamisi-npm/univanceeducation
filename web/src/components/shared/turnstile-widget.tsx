"use client";

import { useEffect, useId, useRef, useState } from "react";
import Script from "next/script";

import { cn } from "@/lib/utils";

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
      appearance?: "always" | "execute" | "interaction-only";
    },
  ) => string;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
  className?: string;
};

/**
 * Explicit Turnstile widget — script loads only while this component is mounted.
 */
export function TurnstileWidget({
  siteKey,
  onToken,
  onExpire,
  onError,
  className,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);
  const reactId = useId();

  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  const verificationStartedRef = useRef(false);

  useEffect(() => {
    onTokenRef.current = onToken;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    if (!scriptReady || !containerRef.current || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      return;
    }

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        if (!verificationStartedRef.current) {
          return;
        }
        onTokenRef.current(token);
      },
      "expired-callback": () => onExpireRef.current(),
      "error-callback": () => onErrorRef.current(),
      theme: "light",
    });

    widgetIdRef.current = widgetId;

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [scriptReady, siteKey]);

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={`turnstile-gate-${reactId}`}
        className="flex min-h-11 w-fit cursor-pointer items-center gap-3 text-sm text-foreground"
      >
        <input
          id={`turnstile-gate-${reactId}`}
          type="checkbox"
          checked={verificationStarted}
          onChange={(event) => {
            const checked = event.currentTarget.checked;
            verificationStartedRef.current = checked;
            setVerificationStarted(checked);
            if (!checked) {
              setScriptReady(false);
              onTokenRef.current("");
            }
          }}
          className="size-4 shrink-0 accent-primary"
        />
        <span>Check this box to start security verification</span>
      </label>

      {verificationStarted ? (
        <>
          <Script
            id={`turnstile-script-${reactId}`}
            src={TURNSTILE_SCRIPT_SRC}
            strategy="afterInteractive"
            onReady={() => setScriptReady(true)}
          />
          <div
            ref={containerRef}
            className="cf-turnstile"
            data-testid="turnstile-widget"
          />
        </>
      ) : null}

    </div>
  );
}
