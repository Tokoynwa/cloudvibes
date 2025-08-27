import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navigation from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudVibes - Best Weather Forecast | Accurate Weather Forecasts & Real-Time Conditions",
  description: "Get accurate weather forecasts, real-time conditions, and detailed weather maps. Your ultimate weather companion for planning your day. Free weather alerts, 7-day forecasts, and local weather conditions worldwide.",
  keywords: [
    "weather", "forecast", "temperature", "rain", "climate", "weather map", 
    "weather today", "weather tomorrow", "weather app", "local weather",
    "weather alerts", "weather radar", "precipitation", "humidity", "wind speed",
    "weather conditions", "meteorology", "weather updates", "weather news",
    "severe weather", "weather warnings", "daily forecast", "hourly weather",
    "weather tracking", "climate data", "weather station", "atmospheric pressure",
    "weather patterns", "seasonal weather", "weather trends", "weather analysis"
  ],
  authors: [{ name: "CloudVibes Weather Team" }],
  creator: "CloudVibes",
  publisher: "CloudVibes Weather Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  openGraph: {
    title: "CloudVibes - Best Weather Forecast | Accurate Weather Forecasts",
    description: "Get accurate weather forecasts, real-time conditions, and detailed weather maps. Free weather alerts, 7-day forecasts, and local weather conditions worldwide.",
    url: "https://cloudvibes.org",
    siteName: "CloudVibes Weather Platform",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://cloudvibes.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CloudVibes Weather Forecast Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CloudVibes",
    creator: "@CloudVibes",
    title: "CloudVibes - Best Weather Forecast | Real-Time Weather Conditions",
    description: "Get accurate weather forecasts, real-time conditions, and detailed weather maps. Free weather alerts and 7-day forecasts worldwide.",
    images: ["https://cloudvibes.org/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://cloudvibes.org",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CloudVibes Weather Platform",
              "url": "https://cloudvibes.org",
              "description": "Professional weather forecasting platform providing accurate weather forecasts, real-time conditions, and detailed weather maps worldwide.",
              "publisher": {
                "@type": "Organization",
                "name": "CloudVibes",
                "url": "https://cloudvibes.org",
                "logo": "https://cloudvibes.org/logo.png"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://cloudvibes.org/weather?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://twitter.com/CloudVibes",
                "https://facebook.com/CloudVibes", 
                "https://youtube.com/CloudVibes"
              ]
            })
          }}
        />
        <link rel="canonical" href="https://cloudvibes.org" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Navigation />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
