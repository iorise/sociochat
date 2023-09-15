import type { Metadata } from "next";

import "@/styles/globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { QueryProvider } from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "min-h-screen")}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
