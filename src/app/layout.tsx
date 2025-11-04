// ...existing code...
import React from "react";
import type { Metadata } from "next";
import "../../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Navigation } from "@/components/Navigation";
import SessionProvider from "@/components/SessionProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "KeepHearing.org",
  description: "Future of hearing — nonprofit platform."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased scroll-smooth transition-all duration-500 overflow-x-hidden">
        <SessionProvider>
        {/* Head tags should be handled by Next.js <Head> component in app/layout.js or app/head.js */}
        <header className="sticky top-0 z-20 bg-[var(--brand-card)] backdrop-blur border-b border-[var(--brand-primary)] shadow-sm transition-all duration-300 w-full">
          <div className="mx-auto max-w-7xl px-3 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/">
                <img src="/images/logo.png" alt="Keep Hearing Initiative Logo" className="h-12 md:h-14 w-auto object-contain" style={{ background: 'transparent', border: 'none', boxShadow: 'none', borderRadius: '0', maxWidth: '280px', padding: 0 }} />
              </a>
            </div>
            <Navigation />
          </div>
        </header>
        <main className="w-full overflow-x-hidden mx-auto max-w-7xl px-3 md:px-6 py-8 md:py-12 min-h-[80vh] transition-all duration-300">
          {children}
        </main>
        <footer className="border-t border-[var(--brand-primary)] bg-[var(--brand-card)] mt-16 md:mt-24 w-full overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-3 md:px-8 py-6 md:py-10">
            {/* Nonprofit Transparency Disclosure */}
            <div className="text-center mb-6 pb-6 border-b border-[#1e3a8a]/20">
              <div className="inline-flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-[#1e3a8a]">501(c)(3) Tax-Exempt Nonprofit Organization</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
                Keep Hearing Initiative is a registered nonprofit organization.
              </p>
            </div>

            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#1e3a8a]">
              <span className="text-xs md:text-sm text-center md:text-left">
                © {new Date().getFullYear()} Keep Hearing Initiative. <span className="hidden md:inline">All rights reserved. | </span>
                <a href="/privacy" className="hover:text-[var(--brand-accent)] underline">Privacy</a> |
                {" "}<a href="/terms" className="hover:text-[var(--brand-accent)] underline">Terms</a>
              </span>
              <div className="flex gap-4 md:gap-6 items-center">
                <a href="https://tiktok.com/@keephearing" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-80 transition">
                  <img src="/images/tiktok.png" alt="TikTok" className="h-5 w-5 md:h-6 md:w-6 object-cover" />
                </a>
                <a href="https://instagram.com/keephearing" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition">
                  <img src="/images/instagram.png" alt="Instagram" className="h-5 w-5 md:h-6 md:w-6 object-cover" />
                </a>
                <a href="https://substack.com/@keephearing" target="_blank" rel="noopener noreferrer" aria-label="Substack" className="hover:opacity-80 transition">
                  <img src="/images/substack.png" alt="Substack" className="h-6 w-6 md:h-8 md:w-8 object-cover" />
                </a>
              </div>
            </div>
          </div>
        </footer>
        <ScrollToTop />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
