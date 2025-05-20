export const EAZE_TOUR_GTAG =
  process.env.NEXT_PUBLIC_EAZE_TOUR_GTAG_ID == null
    ? ""
    : process.env.NEXT_PUBLIC_EAZE_TOUR_GTAG_ID;
// log the pageview with their URL
export function pageview(url: string) {
  window.gtag("config", EAZE_TOUR_GTAG, {
    page_path: url,
  });
}
