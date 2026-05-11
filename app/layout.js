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

// Runs before React hydrates. Reads the persisted theme choice (or falls
// back to the OS preference) and adds `.dark` to <html> so the first paint
// is the right colour scheme — without this the page would flash light
// for users who chose dark.
const THEME_INIT_SCRIPT = `(function () {
  try {
    var t = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = t === 'dark' || ((t === null || t === 'system') && prefersDark);
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
