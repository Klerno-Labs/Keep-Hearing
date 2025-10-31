import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participate in the OTIS Study | Keep Hearing Initiative",
  description: "Join the ACEMg OTIS Study for hearing preservation and tinnitus relief. Free 24-week study conducted at home. NIH listed on ClinicalTrials.gov. Enroll today.",
  keywords: ["OTIS study", "participate", "clinical trial", "hearing preservation", "tinnitus relief", "ACEMg", "research study", "enrollment"],
};

export default function ParticipatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - With Background Image */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=1920&q=80"
            alt="Medical research and clinical study - OTIS hearing preservation study"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-[var(--brand-primary)]/60"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-2xl">
            Participate in the ACEMg for Hearing Preservation and Tinnitus Relief Study
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/95 drop-shadow-lg">
            (the OTIS Study)
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {/* Main Description with Image */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card hover className="p-10 bg-white shadow-xl border-l-4 border-[#2196d4] transform transition-all duration-300 hover:scale-[1.02]">
            <div className="prose prose-lg max-w-none">
              <p className="text-[#1e3a8a] leading-relaxed text-lg">
                ACEMg is a safe nutraceutical regulated as a supplement, the product of medical research.
                This 24-week study is the first of its kind Phase IV open-label, post-marketing study to
                further confirm ACEMg&apos;s benefits on hearing and explore its potential to relieve tinnitus
                symptoms in the general public. <strong className="text-[#1e3a8a]">Participation is free.</strong>
                The study is listed on the NIH site{" "}
                <a
                  href="https://clinicaltrials.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2196d4] hover:text-[#1e3a8a] transition-colors font-semibold underline"
                >
                  ClinicalTrials.gov
                </a>.
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full h-80">
              <Image
                src="/images/main image.png"
                alt="OTIS Study - ACEMg Hearing Preservation and Tinnitus Relief Research"
                fill
                className="object-cover"
              />
            </div>
          </Card>
        </div>

        {/* Collaboration Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card hover glow className="p-8 bg-blue-50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">
                  Partnership & Collaboration
                </h3>
                <p className="text-[#1e3a8a] leading-relaxed">
                  The OTIS study is a collaboration between Keep Hearing Initiative and Soundbites
                  Public Benefit Corporation. Keep Hearing is responsible for IRB compliance, data
                  analysis, and public health reporting.
                </p>
              </div>
            </div>
          </Card>

          <Card hover glow className="p-8 bg-purple-50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#2196d4] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#2196d4] mb-3">
                  Shared Responsibilities
                </h3>
                <p className="text-[#1e3a8a] leading-relaxed">
                  Soundbites PBC donates the ACEMg test product and is responsible for data collection.
                  Both partners are responsible for recruitment, enrollment, and data security.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Benefits Section */}
        <div className="relative overflow-hidden rounded-3xl bg-[var(--brand-primary)] p-12 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTAtOHYyaDJ2LTJoLTJ6bS0yIDB2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0tMi00djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">Study Highlights</h2>
            <p className="text-center text-white/90 text-lg mb-12 max-w-2xl mx-auto">What makes the OTIS Study unique</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="w-20 h-20 mx-auto bg-green-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg transform group-hover:rotate-6 transition-transform">
                  ✓
                </div>
                <h3 className="font-bold text-2xl text-white">Free Participation</h3>
                <p className="text-white/90 text-base leading-relaxed">No cost to participate in this groundbreaking study</p>
              </div>

              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="w-20 h-20 mx-auto bg-purple-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg transform group-hover:rotate-6 transition-transform">
                  🔬
                </div>
                <h3 className="font-bold text-2xl text-white">NIH Listed</h3>
                <p className="text-white/90 text-base leading-relaxed">Registered on ClinicalTrials.gov for transparency</p>
              </div>

              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="w-20 h-20 mx-auto bg-blue-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg transform group-hover:rotate-6 transition-transform">
                  🏥
                </div>
                <h3 className="font-bold text-2xl text-white">Phase IV Study</h3>
                <p className="text-white/90 text-base leading-relaxed">Post-marketing research to confirm benefits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card hover className="p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4 flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              Study Objectives
            </h3>
            <ul className="space-y-3 text-[#1e3a8a]">
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Confirm ACEMg&apos;s benefits on hearing preservation</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Explore potential for tinnitus symptom relief</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Gather real-world evidence and data</span>
              </li>
            </ul>
          </Card>

          <Card hover className="p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4 flex items-center">
              <span className="text-3xl mr-3">📋</span>
              Study Details
            </h3>
            <ul className="space-y-3 text-[#1e3a8a]">
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Duration: 24 weeks</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Type: Phase IV open-label study</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2196d4] mr-2 font-bold">•</span>
                <span>Setting: Post-marketing research</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-12 text-center bg-blue-50 shadow-2xl border-2 border-[#1e3a8a]/20">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#1e3a8a]">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-[#1e3a8a] leading-relaxed">
              Join hundreds of participants contributing to groundbreaking hearing health research.
              Your participation can help advance our understanding of hearing preservation and
              tinnitus relief.
            </p>
            <div className="pt-4">
              <a
                href="https://soundbites.com/pages/study-enrollment"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Participate in public health research →
                </Button>
              </a>
            </div>
            <p className="text-sm text-[#1e3a8a] mt-4">
              Participation is free • Study listed on ClinicalTrials.gov • IRB approved
            </p>
          </div>
        </Card>

      </section>
    </div>
  );
}
