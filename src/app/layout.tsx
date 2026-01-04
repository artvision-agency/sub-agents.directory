import "./globals.css";
import { Header } from "@/components/header";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";
import { rules } from "@/data/rules";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fraunces } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sub-agents.directory"),
  title: {
    default: "Sub-Agents Directory",
    template: "%s | Sub-Agents Directory",
  },
  description: "Find the best Claude Code sub-agent prompts for your framework and language",
  keywords: ["Claude Code", "sub-agents", "MCP servers", "AI prompts", "Anthropic", "Claude"],
  authors: [{ name: "Sub-Agents Directory" }],
  creator: "Sub-Agents Directory",
  publisher: "Sub-Agents Directory",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      rel: "icon",
      url: "/claude-logo.svg",
      type: "image/svg+xml",
    },
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "Sub-Agents Directory",
    description: "Find the best Claude Code sub-agent prompts for your framework and language",
    url: "https://sub-agents.directory",
    siteName: "Sub-Agents Directory",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/cover-image.png",
        width: 1200,
        height: 630,
        alt: "Sub-Agents Directory - Find the best Claude Code sub-agent prompts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sub-Agents Directory",
    description: "Find the best Claude Code sub-agent prompts for your framework and language",
    images: ["/cover-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [{ media: "(prefers-color-scheme: dark)" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        `${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`,
        "whitespace-pre-line antialiased bg-background text-foreground !dark",
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://scripts.simpleanalyticscdn.com" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header rules={rules} />

          <NuqsAdapter>{children}</NuqsAdapter>

          <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noreferrer">
            <Button
              className="hidden size-[48px] bg-[#F5F5F3]/30 text-black border border-black rounded-full font-medium fixed bottom-4 left-6 z-10 backdrop-blur-lg dark:bg-[#F5F5F3]/30 dark:text-white dark:border-white"
              variant="outline"
              size="icon"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </a>

          <Banner />
          <Toaster />
        </ThemeProvider>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="lazyOnload" />
    </html>
  );
}
