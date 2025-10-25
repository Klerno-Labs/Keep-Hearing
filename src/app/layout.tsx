import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "KeepHearing.org",
  description: "Future of hearing — nonprofit platform."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-black antialiased">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[var(--brand-primary)] shadow-sm transition-all duration-300">
          <div className="mx-auto max-w-7xl px-8 h-24 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-3xl tracking-tight text-[var(--brand-primary)]" style={{ letterSpacing: '-0.03em' }}>Keep<span className="text-black">Hearing</span></span>
              <span className="text-lg font-medium ml-2 text-black">initiative</span>
            </div>
            <nav className="flex gap-8 text-base font-medium">
              <a href="/" className="text-gray-700 hover:text-[var(--brand-primary)] transition">Home</a>
              <a href="/about" className="text-gray-700 hover:text-[var(--brand-primary)] transition">About</a>
              <a href="/donate" className="text-gray-700 hover:text-[var(--brand-primary)] transition">Donate</a>
              <a href="/team" className="text-gray-700 hover:text-[var(--brand-primary)] transition">Team</a>
              <a href="/contact" className="text-gray-700 hover:text-[var(--brand-primary)] transition">Contact</a>
              <a href="/signin" className="text-gray-700 hover:text-[var(--brand-primary)] transition">Sign in</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-8 py-16 bg-white min-h-[80vh] transition-all duration-300">{children}</main>
        <footer className="border-t border-[var(--brand-primary)] bg-white mt-24">
          <div className="mx-auto max-w-7xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-base">
            <span>© {new Date().getFullYear()} Keep Hearing Initiative. All rights reserved. | <a href="/privacy" className="hover:text-[var(--brand-primary)] underline">Privacy Policy</a> | <a href="/terms" className="hover:text-[var(--brand-primary)] underline">Terms</a></span>
            <span className="font-semibold text-[var(--brand-primary)]">Future of hearing</span>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
