import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudVibes - Best Weather Forecast",
  description: "Get accurate weather forecasts, real-time conditions, and detailed weather maps. Your ultimate weather companion for planning your day.",
  keywords: ["weather", "forecast", "temperature", "rain", "climate", "weather map"],
  authors: [{ name: "CloudVibes" }],
  creator: "CloudVibes",
  publisher: "CloudVibes",
  openGraph: {
    title: "CloudVibes - Best Weather Forecast",
    description: "Get accurate weather forecasts, real-time conditions, and detailed weather maps.",
    url: "https://cloudvibes.org",
    siteName: "CloudVibes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVibes - Best Weather Forecast",
    description: "Get accurate weather forecasts, real-time conditions, and detailed weather maps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1091636822057337"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
