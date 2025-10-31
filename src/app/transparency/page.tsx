import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nonprofit Transparency & Financials | Keep Hearing Initiative",
  description: "View our 501(c)(3) nonprofit status, financial reports, IRS Form 990, board information, and compliance documents. Full transparency for donors and the public.",
};

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg className="w-12 h-12 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4">
            Nonprofit Transparency
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            As a 501(c)(3) tax-exempt nonprofit organization, we are committed to full transparency.
            View our financial reports, governance documents, and compliance information.
          </p>
        </div>

        {/* 501(c)(3) Status Card */}
        <Card className="p-8 md:p-10 mb-8 bg-white shadow-xl border-2 border-[#1e3a8a]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-3">
                501(c)(3) Tax-Exempt Status
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="font-semibold text-[#1e3a8a]">Legal Name:</p>
                  <p className="text-lg">Keep Hearing Initiative</p>
                </div>
                <div>
                  <p className="font-semibold text-[#1e3a8a]">Founded:</p>
                  <p className="text-lg">2023</p>
                </div>
                <div>
                  <p className="font-semibold text-[#1e3a8a]">Status:</p>
                  <p className="text-lg">Active 501(c)(3) Tax-Exempt Nonprofit</p>
                </div>
                <div>
                  <p className="font-semibold text-[#1e3a8a]">Registration:</p>
                  <p className="text-lg">IRS Approved</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Financial Reports Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Financial Reports</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* IRS Form 990 */}
            <Card className="p-6 bg-white shadow-lg border-l-4 border-[#2196d4]">
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">IRS Form 990</h3>
              <p className="text-gray-600 mb-4">
                Our annual tax returns filed with the IRS, showing revenue, expenses, and programs.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">2024 Form 990</span>
                  <span className="text-sm text-gray-500">Coming Soon</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">2023 Form 990</span>
                  <Button variant="ghost" size="sm" className="text-[#2196d4]">
                    Download PDF
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Note: 990 forms are typically filed 4-6 months after fiscal year end.
              </p>
            </Card>

            {/* Annual Reports */}
            <Card className="p-6 bg-white shadow-lg border-l-4 border-[#c92a76]">
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Annual Reports</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive reports on our programs, impact, and financial summary.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">2024 Annual Report</span>
                  <span className="text-sm text-gray-500">In Progress</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">2023 Annual Report</span>
                  <Button variant="ghost" size="sm" className="text-[#2196d4]">
                    Download PDF
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Annual reports published each January for the previous year.
              </p>
            </Card>
          </div>
        </section>

        {/* Financial Breakdown */}
        <section className="mb-8">
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">How We Use Your Donations</h2>
            <div className="flex justify-center mb-6">
              <div className="text-center max-w-md">
                <div className="text-6xl font-bold text-[#1e3a8a] mb-3">100%</div>
                <div className="text-xl font-semibold text-gray-700 mb-3">Programs & Research</div>
                <p className="text-base text-gray-600">
                  Every dollar donated goes directly to funding the OTIS Study and hearing health education.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center italic">
              *Based on 2023 financials. Updated annually with Form 990 filing.
            </p>
          </Card>
        </section>

        {/* Governance Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Governance & Leadership</h2>
          <Card className="p-8 bg-white shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Board of Directors</h3>
                <p className="text-gray-600 mb-4">
                  Our board provides oversight and ensures we fulfill our mission with integrity.
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-[#1e3a8a]">Board Member Name - President</p>
                    <p className="text-sm text-gray-600">Background and qualifications</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-[#1e3a8a]">Board Member Name - Treasurer</p>
                    <p className="text-sm text-gray-600">Background and qualifications</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-[#1e3a8a]">Board Member Name - Secretary</p>
                    <p className="text-sm text-gray-600">Background and qualifications</p>
                  </div>
                  <p className="text-sm text-gray-500 italic mt-4">
                    Update this section with your actual board members and their credentials.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Governing Documents</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700">Articles of Incorporation</span>
                    <Button variant="ghost" size="sm" className="text-[#2196d4]">
                      Download PDF
                    </Button>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700">Bylaws</span>
                    <Button variant="ghost" size="sm" className="text-[#2196d4]">
                      Download PDF
                    </Button>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700">Conflict of Interest Policy</span>
                    <Button variant="ghost" size="sm" className="text-[#2196d4]">
                      Download PDF
                    </Button>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700">IRS Determination Letter</span>
                    <Button variant="ghost" size="sm" className="text-[#2196d4]">
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Compliance Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Legal & Compliance</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Tax Deductibility</h3>
              <p className="text-gray-700 leading-relaxed">
                Donations to Keep Hearing Initiative are tax-deductible to the fullest extent permitted by law.
                We will provide a receipt for all donations over $250 as required by IRS regulations.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">State Registrations</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                As an online nonprofit accepting donations nationwide, we comply with state charitable solicitation laws.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Registered in: [Your State]</li>
                <li>• Registration #: [Number]</li>
                <li>• Additional states: [As required]</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Contact for Questions */}
        <Card className="p-8 bg-[#1e3a8a] text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Finances or Governance?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We are committed to transparency and accountability. If you have any questions about our nonprofit status,
            financial reports, or how donations are used, please contact us.
          </p>
          <a href="/contact">
            <Button size="lg" className="bg-white text-[#1e3a8a] hover:bg-gray-100">
              Contact Us
            </Button>
          </a>
        </Card>
      </div>
    </div>
  );
}
