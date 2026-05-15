import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Tuterly",
  description: "Tutoring sessions tracked. Curriculum aligned reports prepared.",
};

// Runs before React hydrates. Reads the persisted theme choice and adds
// `.dark` to <html> so the first paint is the right colour scheme. The
// default (no stored choice) is light — dark mode needs a deliberate
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
