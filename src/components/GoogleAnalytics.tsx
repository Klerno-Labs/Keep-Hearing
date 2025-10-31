"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [consent, setConsent] = useState<{
    analytics: boolean;
    marketing: boolean;
  } | null>(null);

  useEffect(() => {
    // Check for existing consent
    const storedConsent = localStorage.getItem("cookieConsent");
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent);
        setConsent({
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
        });
      } catch (e) {
        console.error("Failed to parse cookie consent", e);
      }
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      const newConsent = localStorage.getItem("cookieConsent");
      if (newConsent) {
        try {
          const parsed = JSON.parse(newConsent);
          setConsent({
            analytics: parsed.analytics || false,
            marketing: parsed.marketing || false,
          });
        } catch (e) {
          console.error("Failed to parse cookie consent", e);
        }
      }
    };

    window.addEventListener("storage", handleConsentChange);
    return () => window.removeEventListener("storage", handleConsentChange);
  }, []);

  // Don't load GA if user hasn't consented to analytics
  if (!consent?.analytics) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Set default consent state to denied
            gtag('consent', 'default', {
              'analytics_storage': '${consent?.analytics ? "granted" : "denied"}',
              'ad_storage': '${consent?.marketing ? "granted" : "denied"}',
              'ad_user_data': '${consent?.marketing ? "granted" : "denied"}',
              'ad_personalization': '${consent?.marketing ? "granted" : "denied"}',
              'wait_for_update': 500
            });

            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
