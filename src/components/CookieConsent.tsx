"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after 1 second delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setShowBanner(false);

    // Initialize analytics if accepted
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }

    // Trigger storage event for cross-component communication
    window.dispatchEvent(new Event("storage"));
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setShowBanner(false);

    // Trigger storage event for cross-component communication
    window.dispatchEvent(new Event("storage"));
  };

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setShowBanner(false);
    setShowPreferences(false);

    // Update analytics consent
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
        ad_storage: preferences.marketing ? "granted" : "denied",
      });
    }

    // Trigger storage event for cross-component communication
    window.dispatchEvent(new Event("storage"));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <Card className="max-w-4xl mx-auto bg-white shadow-2xl border-2 border-[#1e3a8a]/20">
          {!showPreferences ? (
            // Main Banner
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-4xl">🍪</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">
                    We Value Your Privacy
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Keep Hearing Initiative uses cookies to enhance your experience, analyze site usage, and assist in our nonprofit operations.
                    As a 501(c)(3) nonprofit, we are committed to transparency in how we handle your data.
                  </p>
                  <p className="text-sm text-gray-600">
                    By clicking "Accept All," you consent to our use of cookies. You can customize your preferences or accept only necessary cookies.
                    Learn more in our{" "}
                    <a href="/privacy" className="text-[#2196d4] underline hover:text-[#1e3a8a]">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <Button
                  onClick={acceptAll}
                  className="flex-1 bg-[#1e3a8a] hover:bg-[#2196d4] text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
                >
                  Accept All Cookies
                </Button>
                <Button
                  onClick={acceptNecessary}
                  variant="secondary"
                  className="flex-1 border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold"
                >
                  Necessary Only
                </Button>
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  className="text-[#1e3a8a] hover:bg-gray-100 px-6 py-3 rounded-lg"
                >
                  Customize
                </Button>
              </div>
            </div>
          ) : (
            // Preferences Panel
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6">
                Cookie Preferences
              </h3>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1e3a8a] mb-1">
                      Necessary Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Essential for website functionality, security, and basic operations. These cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="px-3 py-1 bg-[#1e3a8a] text-white text-sm rounded-full">
                      Always On
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1e3a8a] mb-1">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors interact with our website to improve our nonprofit services.
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2196d4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3a8a]"></div>
                    </label>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1e3a8a] mb-1">
                      Marketing Cookies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Used to deliver relevant information about our research studies and nonprofit mission.
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) =>
                          setPreferences({ ...preferences, marketing: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2196d4]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3a8a]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={savePreferences}
                  className="flex-1 bg-[#1e3a8a] hover:bg-[#2196d4] text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Save Preferences
                </Button>
                <Button
                  onClick={() => setShowPreferences(false)}
                  variant="secondary"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg"
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
