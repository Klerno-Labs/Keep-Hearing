
import React from "react";
import type { Metadata } from "next";
import "../../globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "KeepHearing.org",
  description: "Future of hearing — nonprofit platform."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Future of hearing — nonprofit platform." />
  <meta name="keywords" content="hearing, nonprofit, health, education, research, otis, soundbites, keep hearing" />
  <meta name="author" content="Keep Hearing Initiative" />
  <meta name="theme-color" content="#142a52" />
  <meta name="apple-mobile-web-app-title" content="KeepHearing.org" />
  <meta name="application-name" content="KeepHearing.org" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="canonical" href="https://keephearing.org" />
  <title>KeepHearing.org</title>
  {/* Open Graph Meta Tags */}
  <meta property="og:site_name" content="KeepHearing.org" />
  <meta property="og:title" content="KeepHearing.org" />
  <meta property="og:description" content="Future of hearing — nonprofit platform." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://keephearing.org" />
  <meta property="og:image" content="/og-image.png" />
  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@keephearing" />
  <meta name="twitter:creator" content="@keephearing" />
  <meta name="twitter:title" content="KeepHearing.org" />
  <meta name="twitter:description" content="Future of hearing — nonprofit platform." />
  <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className="min-h-dvh antialiased scroll-smooth transition-all duration-500">
        <header className="sticky top-0 z-20 bg-[var(--brand-card)]/90 backdrop-blur border-b border-[var(--brand-primary)] shadow-sm transition-all duration-300">
          <div className="mx-auto max-w-7xl px-8 h-24 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-3xl tracking-tight text-[var(--brand-primary)]" style={{ letterSpacing: '-0.03em' }}>Keep<span className="text-[var(--brand-accent)]">Hearing</span></span>
              <span className="text-lg font-medium ml-2 text-[var(--brand-text)]">initiative</span>
            </div>
            <nav className="flex gap-8 text-base font-medium">
              <a href="/" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">Home</a>
              <a href="/about" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">About</a>
              <a href="/donate" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">Donate</a>
              <a href="/team" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">Team</a>
              <a href="/contact" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">Contact</a>
              <a href="/signin" className="text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition">Sign in</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-8 py-16 min-h-[80vh] transition-all duration-300 bg-[var(--brand-bg)]">{children}</main>
        <footer className="border-t border-[var(--brand-primary)] bg-[var(--brand-card)] mt-24">
          <div className="mx-auto max-w-7xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--brand-muted)] text-base">
              <span>© {new Date().getFullYear()} Keep Hearing Initiative. All rights reserved. | <a href="/privacy" className="hover:text-[var(--brand-primary)] underline">Privacy Policy</a> | <a href="/terms" className="hover:text-[var(--brand-primary)] underline">Terms</a></span>
              <span className="font-semibold text-[var(--brand-primary)]">Future of hearing</span>
              <div className="flex gap-6 mt-4">
                <a href="https://twitter.com/keephearing" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[var(--brand-primary)] hover:text-[var(--brand-accent)] text-2xl transition">
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161c-.543.929-.855 2.01-.855 3.17 0 2.188 1.115 4.118 2.813 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/></svg>
                </a>
                <a href="https://facebook.com/keephearing" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--brand-primary)] hover:text-[var(--brand-accent)] text-2xl transition">
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.104C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"/></svg>
                </a>
                <a href="https://instagram.com/keephearing" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--brand-primary)] hover:text-[var(--brand-accent)] text-2xl transition">
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.981.981-1.264 2.093-1.323 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.342 2.393 1.323 3.374.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.981-.981 1.264-2.093 1.323-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.342-2.393-1.323-3.374-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://tiktok.com/@keephearing" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[var(--brand-primary)] hover:text-[var(--brand-accent)] text-2xl transition">
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2.003c.001 2.003.001 4.006.002 6.009.001.553.447.999 1 .999h2.003c.553 0 1-.447 1-1V2.003c0-.553-.447-1-1-1h-2.003c-.553 0-1 .447-1 1zm6.009 2.003c0 2.003.001 4.006.002 6.009.001.553.447.999 1 .999h2.003c.553 0 1-.447 1-1V4.006c0-.553-.447-1-1-1h-2.003c-.553 0-1 .447-1 1zm-12.018 0c0 2.003.001 4.006.002 6.009.001.553.447.999 1 .999h2.003c.553 0 1-.447 1-1V4.006c0-.553-.447-1-1-1h-2.003c-.553 0-1 .447-1 1zm6.009 6.009c0 2.003.001 4.006.002 6.009.001.553.447.999 1 .999h2.003c.553 0 1-.447 1-1v-6.009c0-.553-.447-1-1-1h-2.003c-.553 0-1 .447-1 1zm-6.009 0c0 2.003.001 4.006.002 6.009.001.553.447.999 1 .999h2.003c.553 0 1-.447 1-1v-6.009c0-.553-.447-1-1-1h-2.003c-.553 0-1 .447-1 1z"/></svg>
                </a>
              </div>
          </div>
          {/* Testimonials & Impact Stats */}
          <div className="mx-auto max-w-7xl px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-6">
              <span className="text-2xl font-bold text-[var(--brand-primary)]">10,000+</span>
              <div className="text-base text-[var(--brand-muted)] mt-2">People reached worldwide</div>
            </div>
            <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-6">
              <span className="text-2xl font-bold text-[var(--brand-primary)]">3</span>
              <div className="text-base text-[var(--brand-muted)] mt-2">Major studies funded</div>
            </div>
            <div className="bg-[var(--brand-card)] rounded-xl shadow-lg p-6">
              <span className="text-2xl font-bold text-[var(--brand-primary)]">98%</span>
              <div className="text-base text-[var(--brand-muted)] mt-2">Program success rate</div>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
