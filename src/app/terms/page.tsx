import React from "react";
import { Card } from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Keep Hearing Initiative",
  description: "Terms and Conditions for using Keep Hearing Initiative's website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <Card className="p-8 md:p-10 mb-8 bg-white shadow-xl border-none">
          <p className="text-lg md:text-xl text-[#1e3a8a] leading-relaxed text-center">
            By accessing and using the Keep Hearing Initiative website, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>
        </Card>

        <div className="space-y-6">
          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#1e3a8a]">
                By accessing or using KeepHearing.org (the "Website"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our Website.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">2. About Keep Hearing Initiative</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p>
                  Keep Hearing Initiative is a nonprofit organization dedicated to advancing hearing health through research, education, and prevention. We sponsor the OTIS Study in partnership with Soundbites Public Benefit Corporation.
                </p>
                <p className="font-semibold">
                  Tax-Exempt Status: Keep Hearing Initiative is recognized as a 501(c)(3) tax-exempt organization. Donations are tax-deductible to the extent permitted by law.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">3. Use of Website</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <h3 className="font-semibold">Permitted Use</h3>
                <p>You may use our Website for lawful purposes only. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Transmit harmful code or malware</li>
                  <li>Attempt unauthorized access to our systems</li>
                  <li>Use automated systems to access the Website without permission</li>
                  <li>Interfere with other users' access to the Website</li>
                </ul>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">4. Donations</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <div>
                  <h3 className="font-semibold mb-2">Donation Policy</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All donations are voluntary and non-refundable</li>
                    <li>Donations support our mission of hearing research, education, and prevention</li>
                    <li>100% of donations go directly to nonprofit programs</li>
                    <li>Donations are tax-deductible to the extent permitted by law</li>
                    <li>We will provide tax receipts for donations via email</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Refund Policy</h3>
                  <p>
                    Donations are generally non-refundable. If you believe a donation was made in error, please contact us immediately at donations@keephearing.org. We will review requests on a case-by-case basis.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">5. Research Participation</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p>
                  The OTIS Study is conducted in partnership with Soundbites PBC. Participation in research studies is subject to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Separate informed consent agreements</li>
                  <li>IRB (Institutional Review Board) approval protocols</li>
                  <li>Participant eligibility criteria</li>
                  <li>HIPAA compliance and data protection regulations</li>
                </ul>
                <p className="mt-3">
                  Enrollment in research studies is managed through Soundbites.com. Please review their terms and conditions separately.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">6. Intellectual Property</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p>
                  All content on this Website, including text, graphics, logos, images, videos, and software, is the property of Keep Hearing Initiative or its content suppliers and is protected by copyright and intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">7. Third-Party Links and Services</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p>
                  Our Website contains links to third-party websites and services, including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Soundbites.com (research partner)</li>
                  <li>Payment processors (Stripe, PayPal)</li>
                  <li>Social media platforms</li>
                  <li>ClinicalTrials.gov</li>
                </ul>
                <p className="mt-3">
                  We are not responsible for the content, privacy practices, or terms of service of these third-party sites. We encourage you to review their policies independently.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">8. Disclaimer of Warranties</h2>
              <div className="space-y-3 text-[#1e3a8a]">
                <p className="font-semibold">
                  THIS WEBSITE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.
                </p>
                <p>
                  We make no guarantees regarding:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Accuracy or completeness of information</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Specific outcomes from research participation or donations</li>
                </ul>
                <p className="mt-3 italic">
                  Medical Disclaimer: Information on this Website is for educational purposes only and does not constitute medical advice. Always consult with qualified healthcare professionals regarding hearing health concerns.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">9. Limitation of Liability</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                To the fullest extent permitted by law, Keep Hearing Initiative shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website or participation in our programs.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">10. Modifications to Terms</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the Website after changes are posted constitutes acceptance of the modified terms.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">11. Governing Law</h2>
              <p className="text-[#1e3a8a] text-base md:text-lg leading-relaxed">
                These Terms and Conditions are governed by the laws of the United States. Any disputes shall be resolved in accordance with applicable federal and state laws.
              </p>
            </Card>
          </section>

          <section>
            <Card className="p-6 md:p-8 bg-blue-50 shadow-lg border-l-4 border-[#1e3a8a]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">12. Contact Information</h2>
              <p className="text-[#1e3a8a] mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="text-[#1e3a8a] space-y-2">
                <p><strong>Keep Hearing Initiative</strong></p>
                <p>Email: <a href="mailto:info@keephearing.org" className="text-[var(--brand-accent)] hover:underline">info@keephearing.org</a></p>
                <p className="mt-4">
                  <a href="/contact" className="text-[var(--brand-accent)] hover:underline font-semibold">
                    → Visit our Contact Page
                  </a>
                </p>
              </div>
            </Card>
          </section>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our <a href="/privacy" className="text-[var(--brand-accent)] hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
