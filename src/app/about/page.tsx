import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Keep Hearing Initiative",
  description: "Keep Hearing Initiative is a registered 501(c)(3) nonprofit dedicated to hearing health, education, and fair access. Since 2022, we've reached over 10,000 people and funded 3 major studies.",
  keywords: ["nonprofit", "hearing health", "501c3", "team", "mission", "impact", "annual report"],
};

export default function AboutPage() {
  return (
    <div className="space-y-20 max-w-6xl mx-auto px-4 py-4">
      {/* Hero Title */}
      <section className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a8a]">
          About Us
        </h1>
      </section>

      {/* Animated Impact Section - Custom to Keep Hearing Initiative */}
      <section className="relative overflow-hidden">
        <Card className="p-12 md:p-16 text-center bg-blue-50 shadow-2xl border-none">
          <div className="relative z-10">
            <div className="inline-block mb-8">
              <div className="relative">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                  {/* Background circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#e0e7ff"
                    strokeWidth="12"
                  />
                  {/* Animated progress circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#1e3a8a"
                    strokeWidth="12"
                    strokeDasharray="440"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    className="animate-[draw-circle_2s_ease-out_forwards]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-[#1e3a8a]">100<span className="text-3xl">%</span></span>
                </div>
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-semibold text-[#1e3a8a] mb-3">
              Thanks to generous private donors who fund our operational expenses
            </p>
            <p className="text-xl md:text-2xl text-[#1e3a8a] font-medium">
              100% of your donation directly funds hearing research and education programs
            </p>
          </div>
        </Card>
      </section>

      {/* Mission Statement with Image */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Card className="p-10 md:p-12 bg-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1e3a8a]">Our Mission</h2>
            <p className="text-lg text-[#1e3a8a] mb-6 leading-relaxed">
              Keep Hearing Initiative is a registered 501(c)(3) nonprofit dedicated to hearing health, education, and fair access.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2196d4] flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-[#1e3a8a]">Reached over 10,000 people since 2022</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2196d4] flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-[#1e3a8a]">Funded 3 major hearing health studies</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2196d4] flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-[#1e3a8a]">Expanding education programs globally</p>
              </div>
            </div>
            <div className="mt-8">
              <Button variant="ghost" className="text-lg text-[#1e3a8a] hover:text-[#2196d4]">
                View Annual Report →
              </Button>
            </div>
          </Card>
        </div>

        {/* Hero Image */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
            alt="Medical professional examining patient's ear health with otoscope during hearing assessment"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Team Section */}
      <section>
        <Card className="p-10 md:p-12 bg-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#1e3a8a]">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="p-6 rounded-xl bg-blue-50 border-l-4 border-[#2196d4]">
                <h3 className="font-semibold text-xl text-[#1e3a8a]">Chris Hatfield</h3>
                <p className="text-[#1e3a8a]">Founder & Director</p>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 border-l-4 border-[#2196d4]">
                <h3 className="font-semibold text-xl text-[#1e3a8a]">Dr. Jane Audi</h3>
                <p className="text-[#1e3a8a]">Research Lead</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-6 rounded-xl bg-blue-50 border-l-4 border-[#2196d4]">
                <h3 className="font-semibold text-xl text-[#1e3a8a]">Alex Sound</h3>
                <p className="text-[#1e3a8a]">Community Manager</p>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 border-l-4 border-[#2196d4]">
                <h3 className="font-semibold text-xl text-[#1e3a8a]">Sam Lee</h3>
                <p className="text-[#1e3a8a]">Operations</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
