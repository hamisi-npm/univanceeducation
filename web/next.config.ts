import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

function studioFrameAncestors(): string[] {
  const ancestors = ["'self'", "http://localhost:3333", "https://*.sanity.studio"];
  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim();

  if (!studioUrl) {
    return ancestors;
  }

  try {
    const origin = new URL(studioUrl).origin;
    if (!ancestors.includes(origin)) {
      ancestors.push(origin);
    }
  } catch {
    // Ignore malformed studio URL — keep the default allowlist.
  }

  return ancestors;
}

/**
 * Production CSP aligned with App Router + Sanity (CDN, API, Live, Presentation).
 * Applied only in production so local tooling is not over-constrained.
 * Uses 'unsafe-inline' for scripts/styles (no nonce pipeline) to keep ISR/static intact.
 */
function buildContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
    "font-src 'self' data:",
    [
      "connect-src 'self'",
      "https://*.api.sanity.io",
      "https://*.apicdn.sanity.io",
      "https://*.sanity.io",
      "wss://*.api.sanity.io",
    ].join(" "),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${studioFrameAncestors().join(" ")}`,
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

const securityHeaders = [
  // Prefer CSP frame-ancestors (allows Sanity Presentation) over X-Frame-Options.
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: buildContentSecurityPolicy(),
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  logging: {
    fetches: {
      // Verbose fetch URLs aid local debugging; omit in production.
      fullUrl: !isProduction,
    },
  },
  images: {
    // Next 16 SSRF checks treat some NAT64/DNS64 resolutions (64:ff9b::/96)
    // of public CDNs as private IPs and reject them with
    // "url parameter is not allowed". Required for cdn.sanity.io on this network.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
    qualities: [75, 80, 85],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
