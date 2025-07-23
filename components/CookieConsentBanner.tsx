"use client";

import { getLocalStorage, setLocalStorage } from "../lib/storageHelper";
import { useState, useEffect } from "react";

export default function CookieConsentBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
  }, []);

  const handleConsent = (consent: boolean) => {
    // Update Google Analytics consent
    window.gtag("consent", "update", {
      analytics_storage: consent ? "granted" : "denied",
    });

    // Update local storage
    setLocalStorage("cookie_consent", consent);

    // Update state
    setCookieConsent(consent);
    setConsentChecked(true);
  };

  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-gray-700 z-[100] rounded-lg shadow ${consentChecked || cookieConsent ? "hidden" : ""}`}
    >
      <div className="text-center text-gray-400">
        <p>
          We use <span className="font-bold text-sky-400">cookies</span> on our site.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="px-5 py-2 text-gray-300 rounded-md border-gray-900"
          onClick={() => handleConsent(false)}
        >
          Decline
        </button>
        <button
          className="bg-gray-900 px-5 py-2 text-white rounded-lg"
          onClick={() => handleConsent(true)}
        >
          Allow Cookies
        </button>
      </div>
    </div>
  );
}
