import { Suspense } from "react";
import Script from "next/script";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavProgress from "../components/NavProgress";
import { FloatingEnquireButton } from "../components/marketing/EnquireTriggers";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Site-wide metadata defaults. Every page inherits these unless it
// exports its own `metadata` or `generateMetadata`. metadataBase lets
// relative paths (eg /og-image.png) resolve to absolute URLs in OG
// and Twitter tags automatically.
const DEFAULT_TITLE = "Tuterly - Tutoring Reports & Practice for Melbourne";
const DEFAULT_DESCRIPTION =
  "Tuterly turns tutoring into structured session reports, practice worksheets, and progress tracking. Built for families and tutors in Melbourne.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Tuterly",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Tuterly",
    locale: "en_AU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
  // Search-engine ownership verification. Codes come from the env so
  // the actual tokens never land in git. Set GOOGLE_SITE_VERIFICATION
  // in Vercel (Production + Preview) once Google Search Console hands
  // it to you. Empty string falls back to no verification tag.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

// Runs before React hydrates. Reads the persisted theme choice and adds
// `.dark` to <html> so the first paint is the right colour scheme. The
// default (no stored choice) is light - dark mode needs a deliberate
// opt-in via Settings, since the app's UI is tuned for light first.
// "system" is still respected for users who explicitly pick it.
const THEME_INIT_SCRIPT = `(function () {
  try {
    var t = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = t === 'dark' || (t === 'system' && prefersDark);
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <Suspense fallback={null}>
          <NavProgress />
        </Suspense>
        {children}
        <Suspense fallback={null}>
          <FloatingEnquireButton />
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}
