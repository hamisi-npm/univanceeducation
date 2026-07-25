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
  reset: (widgetId?: string) => void;
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
  onWidgetId?: (widgetId: string | null) => void;
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
  onWidgetId,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const reactId = useId();

  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  const onWidgetIdRef = useRef(onWidgetId);

  useEffect(() => {
    onTokenRef.current = onToken;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
    onWidgetIdRef.current = onWidgetId;
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
      callback: (token) => onTokenRef.current(token),
      "expired-callback": () => onExpireRef.current(),
      "error-callback": () => onErrorRef.current(),
      theme: "light",
    });

    widgetIdRef.current = widgetId;
    onWidgetIdRef.current?.(widgetId);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
      onWidgetIdRef.current?.(null);
    };
  }, [scriptReady, siteKey]);

  return (
    <div className={cn("min-h-[65px]", className)}>
      <Script
        id={`turnstile-script-${reactId}`}
        src={TURNSTILE_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div
        ref={containerRef}
        className="cf-turnstile"
        data-testid="turnstile-widget"
      />
    </div>
  );
}

export function resetTurnstileWidget(widgetId: string | null): void {
  if (!widgetId || typeof window === "undefined" || !window.turnstile) {
    return;
  }
  window.turnstile.reset(widgetId);
}
