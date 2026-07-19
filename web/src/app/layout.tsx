import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { createMetadata } from "@/lib/metadata";
import { SanityLive } from "@/lib/sanity/live";
import { getSiteConfig } from "@/services/site";
import { cn } from "@/lib/utils";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const site = await getSiteConfig();
    return createMetadata(undefined, site);
  } catch {
    return {
      title: "Univance Education",
      description: "Study abroad consultancy",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", GeistSans.variable, GeistMono.variable)}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
