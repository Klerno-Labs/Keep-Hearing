import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keep Hearing Initiative | 501(c)(3) Nonprofit for Hearing Loss Prevention Research",
  description: "Keep Hearing Initiative is a 501(c)(3) nonprofit bringing hearing preventive care to the world. ACEMg (Soundbites) is clinically proven to preserve or improve hearing. Join our OTIS public health study. 100% of donations fund research.",
  keywords: ["hearing loss prevention", "ACEMg", "Soundbites", "OTIS study", "hearing health", "tinnitus relief", "nonprofit", "clinical research", "501c3", "hearing research donation", "prevent hearing loss"],
  authors: [{ name: "Keep Hearing Initiative" }],
  creator: "Keep Hearing Initiative",
  publisher: "Keep Hearing Initiative",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://keephearing.org',
    siteName: 'Keep Hearing Initiative',
    title: 'Keep Hearing Initiative | Nonprofit Hearing Loss Prevention Research',
    description: '501(c)(3) nonprofit dedicated to hearing health research. Join our OTIS study. 100% of donations fund programs.',
    images: [
      {
        url: 'https://keephearing.org/images/OTIS_badge.png',
        width: 1200,
        height: 630,
        alt: 'Keep Hearing Initiative - OTIS Study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keep Hearing Initiative | Hearing Loss Prevention Research',
    description: '501(c)(3) nonprofit bringing hearing preventive care to the world. Join our OTIS study.',
    images: ['https://keephearing.org/images/OTIS_badge.png'],
  },
  alternates: {
    canonical: 'https://keephearing.org',
  },
  category: 'Health & Medical Research',
};

export default function Home() {
  return (
    <>
      {/* Schema.org structured data for SEO and Google Ad Grants */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "Keep Hearing Initiative",
            "alternateName": "Keep Hearing",
            "url": "https://keephearing.org",
            "logo": "https://keephearing.org/images/logo.png",
            "description": "501(c)(3) nonprofit organization dedicated to advancing hearing health through research, education, and prevention. Sponsors the OTIS Study in partnership with Soundbites PBC.",
            "email": "info@keephearing.org",
            "foundingDate": "2023",
            "nonprofitStatus": "Nonprofit501c3",
            "taxID": "501(c)(3)",
            "areaServed": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "sameAs": [
              "https://tiktok.com/@keephearing",
              "https://instagram.com/keephearing",
              "https://substack.com/@keephearing"
            ],
            "knowsAbout": [
              "Hearing Loss Prevention",
              "Sensorineural Hearing Loss",
              "Tinnitus Research",
              "ACEMg Supplement",
              "Hearing Health Education"
            ],
            "memberOf": {
              "@type": "Organization",
              "name": "501(c)(3) Nonprofit Organizations"
            },
            "seeks": {
              "@type": "Demand",
              "description": "Donations to support hearing health research and education"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ResearchProject",
            "name": "OTIS Study - Otology Intervention Study of ACEMg",
            "description": "24-week clinical study assessing Soundbites' impact on hearing sensitivity, tinnitus, and hyperacusis",
            "url": "https://keephearing.org/participate",
            "sponsor": {
              "@type": "NGO",
              "name": "Keep Hearing Initiative"
            },
            "fundedItem": {
              "@type": "MedicalStudy",
              "studySubject": "Hearing Loss Prevention and Tinnitus Management"
            }
          })
        }}
      />

      <div className="space-y-8 md:space-y-16 max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-6">
      {/* Hero Section with Audiogram Image */}
      <section className="relative overflow-hidden rounded-xl md:rounded-2xl animate-fade-in">
        {/* Background Image - Audiogram/Hearing Science */}
        <div className="relative h-[300px] md:h-[450px] lg:h-[550px]">
          <Image
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1920&q=80"
            alt="Medical professional conducting a hearing test with patient using audiometry equipment"
            fill
            className="object-cover brightness-50"
            priority
          />

          {/* Solid Dark Overlay (no gradient) */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center space-y-3 md:space-y-6 px-3 md:px-6 z-10">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
              Bringing hearing preventive care to the world.
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Supporting research and education for hearing health through innovative solutions and community engagement.
            </p>
            <div className="pt-1 md:pt-3">
              <a href="/participate">
                <Button size="lg" className="text-xs md:text-base lg:text-lg px-4 md:px-8 lg:px-10 py-2 md:py-4 lg:py-5 shadow-2xl hover:scale-105 transition-transform bg-white !text-[#1e3a8a] hover:bg-gray-100">
                  Learn More About Our Research →
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Access Section - Solid Color */}
      <section className="animate-slide-up">
        <Card className="p-4 md:p-8 lg:p-10 bg-blue-50 border-l-4 border-[var(--brand-accent)] shadow-xl">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-accent)] mb-3 md:mb-5">
            Fair Access
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#1e3a8a] leading-relaxed">
            Hearing loss is already a major global disability, affecting 1.5 billion people. Another 1.4 billion young adults 12 to 34 are at early risk of hearing loss from loud music from personal music players, clubs and festivals. Keep Hearing Initiative exists to help solve this problem for everyone.
          </p>
        </Card>
      </section>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 animate-slide-up">
        {/* Left Column - Study Cards */}
        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <Card hover className="p-4 md:p-8 group border-t-4 border-[var(--brand-primary)] shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-5 text-[var(--brand-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
              OTIS Public Health Study
            </h2>
            <p className="text-[#1e3a8a] mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              The Keep Hearing initiative is the sponsor of the Otology Intervention Study of ACEMg (the OTIS Study) in partnership with Soundbites PBC. The 24-week OTIS study is conducted at home, assessing Soundbites&apos; impact on hearing sensitivity, tinnitus (ringing in the ears) and sound intolerance (hyperacusis).
            </p>
            <a href="/participate">
              <Button variant="ghost" size="lg" className="text-sm md:text-base group-hover:scale-105 transition-transform">
                Learn more →
              </Button>
            </a>
          </Card>

          <Card hover className="p-4 md:p-8 group border-t-4 border-[var(--brand-accent)] shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-5 text-[var(--brand-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
              Hearing Biology Education
            </h2>
            <p className="text-[#1e3a8a] mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              Learn about the biological origins of hearing loss, its cellular biochemistry, and how the origins of hearing loss can be blocked. Discover everything about Sensorineural Hearing Loss (SNHL) and ACEMg (Soundbites) in the 5-session videos.
            </p>
            <a href="/learn">
              <Button variant="ghost" size="lg" className="text-sm md:text-base group-hover:scale-105 transition-transform">
                Watch now →
              </Button>
            </a>
          </Card>
        </div>

        {/* Right Column - Badge & Image */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* OTIS Study Badge */}
          <div className="flex justify-center items-start pt-3 md:pt-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--brand-primary)]/10 rounded-full blur-2xl"></div>
              <Image
                src="/images/OTIS_badge.png"
                alt="OTIS Study Badge - Otology Intervention Study of ACEMg formula by Keep Hearing Initiative and Soundbites Public Health Research"
                width={300}
                height={300}
                className="relative w-40 h-40 md:w-56 md:h-56 object-contain"
              />
            </div>
          </div>

          {/* Education Image - Science/Biology themed */}
          <div className="md:mt-12">
            <Card className="overflow-hidden shadow-lg bg-white">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80"
                  alt="Scientific research and molecular biology visualization for hearing loss prevention education"
                  width={600}
                  height={400}
                  className="w-full h-40 md:h-60 object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Partnership Section - Soundbites */}
      <section className="animate-slide-up">
        <a
          href="https://soundbites.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card className="p-4 md:p-8 lg:p-10 bg-white border-2 border-[#c92a76]/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.01]">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0 w-24 h-24 md:w-40 md:h-40 relative">
                <Image
                  src="/images/soundbites.png"
                  alt="Soundbites hearing wellness product"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left space-y-2 md:space-y-3">
                <div className="inline-block px-2 md:px-3 py-1 bg-[#c92a76]/10 rounded-full mb-1">
                  <span className="text-[#c92a76] font-bold text-xs uppercase tracking-wide">In Partnership With Soundbites</span>
                </div>
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-[var(--brand-primary)]">
                  Supporting Hearing Health Together
                </h2>
                <p className="text-xs md:text-sm lg:text-base text-[#1e3a8a] leading-relaxed max-w-3xl">
                  Keep Hearing is proud to partner with Soundbites, a wellness brand dedicated to advancing hearing health. Through this partnership, 10% of every Soundbites sale is donated directly to KeepHearing.org, helping fund our mission to support hearing research, education, and prevention.
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center text-[#c92a76] font-semibold text-sm md:text-base group-hover:gap-2 gap-1 transition-all">
                    Learn More About Soundbites
                    <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </a>
      </section>

      {/* Impact Metrics Section */}
      <section className="animate-slide-up">
        <Card className="p-4 md:p-8 lg:p-10 bg-white border-2 border-[var(--brand-primary)]/10 shadow-2xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--brand-primary)] text-center mb-4 md:mb-6">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-3 md:p-0">
              <div className="text-3xl md:text-4xl font-bold text-[var(--brand-accent)] mb-1">1,000+</div>
              <div className="text-sm md:text-base text-[#1e3a8a] font-semibold">OTIS Study Participants</div>
              <p className="text-xs text-gray-600 mt-1">Contributing to groundbreaking research</p>
            </div>
            <div className="text-center p-3 md:p-0">
              <div className="text-3xl md:text-4xl font-bold text-[var(--brand-accent)] mb-1">24</div>
              <div className="text-sm md:text-base text-[#1e3a8a] font-semibold">Weeks of Research</div>
              <p className="text-xs text-gray-600 mt-1">Long-term hearing health study</p>
            </div>
            <div className="text-center p-3 md:p-0">
              <div className="text-3xl md:text-4xl font-bold text-[var(--brand-accent)] mb-1">100%</div>
              <div className="text-sm md:text-base text-[#1e3a8a] font-semibold">Funds to Programs</div>
              <p className="text-xs text-gray-600 mt-1">Every dollar supports our mission</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Donation Section - Hidden until ready for launch */}
      {/*
      <section className="animate-slide-up">
        <Card className="p-4 md:p-8 lg:p-10 text-center space-y-4 md:space-y-6 bg-purple-50 border-2 border-[var(--brand-primary)]/10 shadow-2xl">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-primary)]">
            Support Our Mission
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#1e3a8a] max-w-2xl mx-auto leading-relaxed px-2">
            Your donation helps us expand hearing preventive care and education worldwide. 100% of donations go to nonprofit programs.
          </p>

          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 py-3 md:py-4">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-lg shadow-md w-full max-w-xs md:w-auto">
              <span className="text-lg md:text-xl">✓</span>
              <div className="text-left">
                <div className="text-xs font-bold text-[var(--brand-primary)]">501(c)(3) Nonprofit</div>
                <div className="text-xs text-gray-600">Tax-deductible</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-lg shadow-md w-full max-w-xs md:w-auto">
              <span className="text-lg md:text-xl">🔒</span>
              <div className="text-left">
                <div className="text-xs font-bold text-[var(--brand-primary)]">Secure Payments</div>
                <div className="text-xs text-gray-600">SSL encrypted</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-lg shadow-md w-full max-w-xs md:w-auto">
              <span className="text-lg md:text-xl">📧</span>
              <div className="text-left">
                <div className="text-xs font-bold text-[var(--brand-primary)]">Tax Receipts</div>
                <div className="text-xs text-gray-600">Sent via email</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 max-w-xl mx-auto px-3">
            Keep Hearing Initiative is a registered 501(c)(3) tax-exempt organization. Your donation is tax-deductible to the extent permitted by law.
          </p>
        </Card>
      </section>
      */}

      {/* Newsletter Section - Substack Embed */}
      <section className="max-w-3xl mx-auto">
        <Card className="p-4 md:p-8 lg:p-10 border-l-4 border-[var(--brand-accent)] shadow-lg bg-white">
          <iframe
            src="https://keephearing.substack.com/embed"
            width="100%"
            height="320"
            style={{ border: '1px solid #EEE', background: 'white' }}
            frameBorder="0"
            scrolling="no"
            title="Keep Hearing Substack Newsletter Subscription"
          ></iframe>
        </Card>
      </section>

    </div>
    </>
  );
}
