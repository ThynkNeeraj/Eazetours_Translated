'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    // Define the global callback before loading the script
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,es,fr,de,zh-CN,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
