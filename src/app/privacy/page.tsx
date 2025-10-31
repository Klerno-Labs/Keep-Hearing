import React from "react";
import { Card } from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Keep Hearing Initiative",
  description: "Privacy Policy for Keep Hearing Initiative - Learn how we protect and handle your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <Card className="p-8 md:p-10 mb-8 bg-white shadow-xl border-none">
          <p className="text-lg md:text-xl text-[#1e3a8a] leading-relaxed text-center">
            Keep Hearing Initiative is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or participate in our programs.
          </p>
        </Card>

        <div className="space-y-6">
          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Information We Collect</h2>
              <div className="space-y-4 text-[#1e3a8a]">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                  <p>When you interact with our website, participate in research studies, or make donations, we may collect:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Donation and payment information</li>
                    <li>Study participation data (if you enroll in the OTIS Study)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Browser type and version</li>
                    <li>IP address</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">How We Use Your Information</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process donations and provide tax receipts</li>
                  <li>Manage research study enrollment and participation</li>
                  <li>Send newsletters and updates (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Respond to inquiries and provide customer support</li>
                </ul>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Information Sharing</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p className="font-semibold">We do not sell, trade, or rent your personal information to third parties.</p>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Research Partners:</strong> Study participation data with Soundbites PBC for the OTIS Study (with your explicit consent)</li>
                  <li><strong>Service Providers:</strong> Third-party vendors who help us operate our website and process donations (e.g., payment processors)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Data Security</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Your Rights</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications at any time</li>
                  <li>Withdraw consent for data processing (where applicable)</li>
                </ul>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Cookies and Tracking</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Third-Party Links</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                Our website may contain links to third-party websites (including Soundbites.com). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Children's Privacy</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Changes to This Policy</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-blue-50 shadow-lg border-l-4 border-[#1e3a8a]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Contact Us</h2>
              <p className="text-[#1e3a8a] mb-4">
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <div className="text-[#1e3a8a] space-y-2">
                <p><strong>Keep Hearing Initiative</strong></p>
                <p>Email: <a href="mailto:privacy@keephearing.org" className="text-[var(--brand-accent)] hover:underline">privacy@keephearing.org</a></p>
                <p className="mt-4">
                  <a href="/contact" className="text-[var(--brand-accent)] hover:underline font-semibold">
                    → Visit our Contact Page
                  </a>
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
