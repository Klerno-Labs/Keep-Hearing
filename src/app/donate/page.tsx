"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heart, Shield, FileCheck } from "lucide-react";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  const presetAmounts = [25, 50, 100, 250];

  const handleDonate = () => {
    const donationAmount = amount || parseFloat(customAmount);
    if (donationAmount && donationAmount > 0) {
      // Handle donation submission
      console.log(`Donating $${donationAmount} - ${frequency}`);
      // You can redirect to payment gateway here
    }
  };

  return (
    <div className="space-y-8 md:space-y-12 max-w-5xl mx-auto px-3 md:px-4 py-3 md:py-6">
      {/* Hero Title */}
      <section className="text-center space-y-2 md:space-y-3 animate-fade-in">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1e3a8a]">
          Support Our Mission
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-[#1e3a8a] max-w-2xl mx-auto px-2">
          Your donation helps us expand hearing preventive care and education worldwide.
        </p>
      </section>

      {/* Main Donation Card */}
      <Card className="p-3 md:p-6 lg:p-10 bg-white shadow-2xl">
        {/* Frequency Selector */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="inline-flex w-full max-w-sm rounded-lg border-2 border-[#1e3a8a] overflow-hidden">
            <button
              onClick={() => setFrequency("one-time")}
              className={`flex-1 px-3 md:px-6 py-2 font-semibold text-xs md:text-sm transition-all ${
                frequency === "one-time"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-white text-[#1e3a8a] hover:bg-blue-50"
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => setFrequency("monthly")}
              className={`flex-1 px-3 md:px-6 py-2 font-semibold text-xs md:text-sm transition-all ${
                frequency === "monthly"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-white text-[#1e3a8a] hover:bg-blue-50"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-base md:text-xl font-bold text-[#1e3a8a] text-center mb-3 md:mb-4">
            Select Amount
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
                className={`p-3 md:p-5 rounded-lg font-bold text-lg md:text-xl transition-all border-2 touch-manipulation ${
                  amount === preset
                    ? "bg-[#1e3a8a] text-white border-[#1e3a8a] scale-105"
                    : "bg-white text-[#1e3a8a] border-gray-200 hover:border-[#2196d4]"
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>
          <div className="max-w-md mx-auto">
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(null);
              }}
              className="w-full p-3 text-base md:text-lg text-center rounded-lg border-2 border-gray-200 focus:border-[#2196d4] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Impact Message */}
        {(amount || parseFloat(customAmount) > 0) && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-50 rounded-lg text-center animate-fade-in">
            <p className="text-xs md:text-sm text-[#1e3a8a] font-semibold">
              Your ${amount || customAmount} donation {frequency === "monthly" ? "per month" : ""} helps fund critical hearing research and education programs.
            </p>
          </div>
        )}

        {/* 100% Message */}
        <div className="mb-4 md:mb-6 text-center px-2">
          <p className="text-base md:text-lg lg:text-xl font-bold text-[#1e3a8a] mb-1">
            100% of donations go directly to programs
          </p>
          <p className="text-xs md:text-sm text-[#1e3a8a]">No administrative fees, no middlemen</p>
        </div>

        {/* Donate Button */}
        <div className="text-center mb-4 md:mb-6">
          <Button
            onClick={handleDonate}
            disabled={!amount && !parseFloat(customAmount)}
            size="lg"
            className="w-full md:w-auto text-sm md:text-base px-6 md:px-10 py-3 md:py-4 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            Donate Securely →
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 md:pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 justify-center p-2 md:p-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1e3a8a] text-xs">501(c)(3) Nonprofit</p>
              <p className="text-xs text-gray-600">Tax-deductible</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center p-2 md:p-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1e3a8a] text-xs">Secure Payments</p>
              <p className="text-xs text-gray-600">SSL encrypted</p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center p-2 md:p-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1e3a8a] text-xs">Tax Receipts</p>
              <p className="text-xs text-gray-600">Emailed instantly</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Impact Examples */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-[#1e3a8a] text-center mb-4 md:mb-6">
          Your Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-4 md:p-5 bg-white shadow-lg border-l-4 border-[#2196d4]">
            <p className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-1">$25</p>
            <p className="text-xs md:text-sm text-[#1e3a8a]">Provides hearing education materials for 5 students</p>
          </Card>
          <Card className="p-4 md:p-5 bg-white shadow-lg border-l-4 border-[#2196d4]">
            <p className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-1">$100</p>
            <p className="text-xs md:text-sm text-[#1e3a8a]">Funds one week of clinical research data analysis</p>
          </Card>
          <Card className="p-4 md:p-5 bg-white shadow-lg border-l-4 border-[#2196d4]">
            <p className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-1">$250</p>
            <p className="text-xs md:text-sm text-[#1e3a8a]">Sponsors a participant in the OTIS study for one month</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
