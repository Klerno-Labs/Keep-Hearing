"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
        setTimeout(() => {
          setStatus("idle");
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-[#1e3a8a] max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card hover className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--brand-primary)]/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-[var(--brand-primary)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-2">Email Us</h3>
            <p className="text-[#1e3a8a] mb-3">General inquiries</p>
            <a href="mailto:info@keephearing.org" className="text-[var(--brand-accent)] hover:underline font-semibold">
              info@keephearing.org
            </a>
          </Card>

          <Card hover className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-2">Donation Questions</h3>
            <p className="text-[#1e3a8a] mb-3">Tax receipts & giving</p>
            <a href="mailto:donations@keephearing.org" className="text-[var(--brand-accent)] hover:underline font-semibold">
              donations@keephearing.org
            </a>
          </Card>

          <Card hover className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-[var(--brand-primary)] mb-2">Research & OTIS Study</h3>
            <p className="text-[#1e3a8a] mb-3">Study participation</p>
            <a href="mailto:research@keephearing.org" className="text-[var(--brand-accent)] hover:underline font-semibold">
              research@keephearing.org
            </a>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-[var(--brand-primary)] mb-6">Send Us a Message</h2>

            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                <p className="text-green-700 text-sm mt-1">We'll get back to you within 1-2 business days.</p>
              </div>
            )}

            {status === "error" && errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">✗ Error</p>
                <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="research">OTIS Study / Research</option>
                  <option value="donation">Donations & Giving</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="w-full"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-sm text-gray-600 text-center">
                We typically respond within 1-2 business days
              </p>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-[var(--brand-primary)] mb-4">Office Hours</h3>
              <div className="space-y-2 text-[#1e3a8a]">
                <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM EST</p>
                <p><strong>Saturday - Sunday:</strong> Closed</p>
                <p className="text-sm text-gray-600 mt-4">
                  We respond to emails within 1-2 business days
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-purple-50">
              <h3 className="text-xl font-bold text-[var(--brand-primary)] mb-4">OTIS Study Enrollment</h3>
              <p className="text-[#1e3a8a] mb-4">
                Ready to participate in groundbreaking hearing research? Enrollment is managed through our partner, Soundbites.
              </p>
              <a
                href="https://soundbites.com/pages/study-enrollment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[var(--brand-primary)] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Enroll in OTIS Study →
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
