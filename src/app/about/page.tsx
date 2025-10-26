export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-[var(--brand-bg)]">
      <section className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-[var(--brand-bg)]">
      <section className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--brand-primary)]">About Us & Impact</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Keep Hearing Initiative is a registered nonprofit dedicated to hearing health, education, and fair access. Since 2022, we've reached over 10,000 people and funded 3 major studies. Read our annual report for more details.</p>
        <a href="#annual-report" className="text-[var(--brand-primary)] font-semibold hover:underline text-lg">View Annual Report</a>
      </section>
    </main>
  );
}
