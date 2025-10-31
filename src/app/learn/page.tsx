import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hearing Biology Education | Keep Hearing Initiative",
  description: "Learn about the biological origins of hearing loss, its cellular biochemistry, and how ACEMg (Soundbites) can help prevent sensorineural hearing loss. Watch our comprehensive 5-session video series.",
  keywords: ["hearing loss", "hearing biology", "SNHL", "sensorineural hearing loss", "ACEMg", "Soundbites", "hearing education", "hearing prevention"],
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - With Background Image */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1920&q=80"
            alt="Microscopic view of inner ear hair cells and cochlea structure for hearing biology education"
            fill
            className="object-cover brightness-40"
            priority
          />
          <div className="absolute inset-0 bg-[var(--brand-primary)]/70"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-2xl">
            Hearing Biology Education
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/95 drop-shadow-lg">
            Understanding the Science of Hearing Loss Prevention
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <Card className="overflow-hidden shadow-2xl border-4 border-white">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/GJGDy1sfHYA?autoplay=1&mute=1&playlist=GJGDy1sfHYA,jsWWPX-NIZQ,H06_sBc-lnc,dFulwweciUE,ryoHG3CU5ZY&loop=0"
              title="SNHL and Soundbites - Hearing Biology Education Series - Session 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Card>

        {/* Additional Videos */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/jsWWPX-NIZQ"
                title="SNHL and Soundbites - Session 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/H06_sBc-lnc"
                title="SNHL and Soundbites - Session 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dFulwweciUE"
                title="SNHL and Soundbites - Session 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ryoHG3CU5ZY"
                title="SNHL and Soundbites - Session 5"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Card>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {/* Main Description */}
        <Card hover className="p-10 bg-white shadow-xl border-l-4 border-[var(--brand-accent)]">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#1e3a8a] leading-relaxed text-lg">
              Learn about the biological origins of hearing loss, its cellular biochemistry, and how the origins
              of hearing loss can be blocked. Discover everything about Sensorineural Hearing Loss (SNHL) and
              ACEMg (Soundbites) in the 5-session videos.
            </p>
          </div>
        </Card>

        {/* Video Series Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card hover className="p-8 bg-white border-t-4 border-[var(--brand-primary)]">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--brand-primary)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--brand-primary)] mb-3">
                  Comprehensive Education
                </h3>
                <p className="text-[#1e3a8a] leading-relaxed">
                  Our 5-session video series provides in-depth knowledge about hearing biology,
                  cellular mechanisms, and the latest research in hearing loss prevention.
                </p>
              </div>
            </div>
          </Card>

          <Card hover className="p-8 bg-white border-t-4 border-[var(--brand-accent)]">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--brand-accent)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--brand-accent)] mb-3">
                  Scientific Foundation
                </h3>
                <p className="text-[#1e3a8a] leading-relaxed">
                  Understand the biochemistry of hearing loss at the cellular level and learn how
                  ACEMg (Soundbites) works to preserve and protect your hearing.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Topics Section */}
        <div className="relative overflow-hidden rounded-3xl bg-[var(--brand-primary)] p-12 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTAtOHYyaDJ2LTJoLTJ6bS0yIDB2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0tMi00djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">What You&apos;ll Learn</h2>
            <p className="text-center text-white/90 text-lg mb-12 max-w-2xl mx-auto">Comprehensive education on hearing biology and prevention</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="w-20 h-20 mx-auto bg-pink-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg transform group-hover:rotate-6 transition-transform">
                  🧬
                </div>
                <h3 className="font-bold text-2xl text-white">Cellular Biology</h3>
                <p className="text-white/90 text-base leading-relaxed">How hearing works at the cellular level</p>
              </div>

              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="w-20 h-20 mx-auto bg-cyan-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg transform group-hover:rotate-6 transition-transform">
                  🔬
                </div>
                <h3 className="font-bold text-2xl text-white">Biochemistry</h3>
                <p className="text-white/90 text-base leading-relaxed">Chemical processes that affect hearing</p>
              </div>

              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg transform group-hover:rotate-6 transition-transform">
                  🛡️
                </div>
                <h3 className="font-bold text-2xl text-white">Prevention</h3>
                <p className="text-white/90 text-base leading-relaxed">How to block the origins of hearing loss</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Covered */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card hover className="p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[var(--brand-primary)] mb-4 flex items-center">
              <span className="text-3xl mr-3">📚</span>
              Topics Covered
            </h3>
            <ul className="space-y-3 text-[#1e3a8a]">
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Sensorineural Hearing Loss (SNHL) mechanisms</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Inner ear structure and function</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Cellular damage pathways</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>ACEMg formula and mechanism of action</span>
              </li>
            </ul>
          </Card>

          <Card hover className="p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[var(--brand-primary)] mb-4 flex items-center">
              <span className="text-3xl mr-3">🎓</span>
              Learning Format
            </h3>
            <ul className="space-y-3 text-[#1e3a8a]">
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>5 comprehensive video sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Expert-led presentations</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Visual aids and diagrams</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Self-paced learning</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-12 text-center bg-white shadow-2xl border-2 border-[var(--brand-primary)]/20">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[var(--brand-primary)]">
              Ready to Take Action?
            </h2>
            <p className="text-xl text-[#1e3a8a] leading-relaxed">
              After learning about the science of hearing loss, join our research study to help
              advance hearing health for everyone.
            </p>
            <div className="pt-4">
              <a
                href="/participate"
                className="inline-block"
              >
                <button className="bg-[var(--brand-primary)] text-white px-12 py-4 rounded-xl text-xl font-bold shadow-xl hover:bg-[var(--brand-accent)] transition-colors">
                  Participate in Research →
                </button>
              </a>
            </div>
            <p className="text-sm text-[#1e3a8a] mt-4">
              Free participation • NIH listed • IRB approved
            </p>
          </div>
        </Card>

      </section>
    </div>
  );
}
