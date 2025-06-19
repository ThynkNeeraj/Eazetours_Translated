// components/language-switcher.tsx
"use client";

import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<{
    languages: LanguageDescriptor[];
    defaultLanguage: string;
  }>();

  useEffect(() => {
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];
    let languageValue;

    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }

    if (languageValue) {
      setCurrentLanguage(languageValue);
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  if (!languageConfig?.languages || !currentLanguage) return null;

  const switchLanguage = (lang: string) => () => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    window.location.reload();
  };

  return (
    <div className="text-center py-2 notranslate">
      {languageConfig.languages.map((ld) =>
        currentLanguage === ld.name ||
        (currentLanguage === "auto" &&
          languageConfig.defaultLanguage === ld.name) ? (
          <span key={`l_s_${ld.name}`} className="mx-2 text-orange-400">
            {ld.title}
          </span>
        ) : (
          <a
            key={`l_s_${ld.name}`}
            onClick={switchLanguage(ld.name)}
            className="mx-2 text-blue-500 cursor-pointer hover:underline"
          >
            {ld.title}
          </a>
        )
      )}
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };
