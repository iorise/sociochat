import type { Metadata } from "next";

import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { QueryProvider } from "@/providers/query-provider";
import { SocketProvider } from "@/providers/socket-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Sociochat",
    "Next.js",
    "React",
    "Node.js",
    "Server Components",
    "Server Actions",
    "Chat",
    "Chat App",
    "Realtime Chat",
    "Realtime Chat App",
  ],
  authors: [
    {
      name: "iorise",
      url: "https://github.com/iorise",
    },
  ],
  creator: "iorise",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "min-h-screen antialiased")}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SocketProvider>
              <QueryProvider>{children}</QueryProvider>
              <Toaster />
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
