// components/GoogleAnalytics.tsx
"use client";

import Script from "next/script";
import { EAZE_TOUR_GTAG } from "../lib/gTagHelper";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${EAZE_TOUR_GTAG}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${EAZE_TOUR_GTAG}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
}
