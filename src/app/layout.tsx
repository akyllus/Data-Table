import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: "Data Management Dashboard",
    template: "%s | Data Management Dashboard",
  },
  description: "A professional data management system built with Next.js",
  keywords: [
    "data management",
    "dashboard",
    "Next.js",
    "React",
    "TypeScript",
    "CRUD",
  ],
  authors: [
    {
      name: "Your Name",
      url: "https://yourwebsite.com",
    },
  ],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Data Management Dashboard",
    description: "A professional data management system built with Next.js",
    siteName: "Data Management Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Management Dashboard",
    description: "A professional data management system built with Next.js",
    creator: "@Akyllus",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Root layout interface
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} font-sans min-h-screen bg-background antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Error Boundary */}
              <ErrorBoundary fallback={<ErrorFallback />} children={undefined}>
                {/* Loading Boundary */}
                <Suspense fallback={<LoadingSpinner />}>
                  {children}
                </Suspense>
              </ErrorBoundary>
            </main>

            <Footer />
          </div>

          {/* Toast Notifications */}
          <Toaster />

          {/* Analytics */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

// Error Boundary Component
function ErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

// Error Fallback Component
function ErrorFallback() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Something went wrong!
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Please try refreshing the page or contact support if the problem persists.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        Refresh Page
      </button>
    </div>
  );
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

// Utility to merge classNames
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}