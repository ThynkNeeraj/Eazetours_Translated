import React from "react";
import { getTranslations } from "../../lib/translationHelper";
import { ITranslations } from "../../types/Common";
import ClientDestinationSlider from "../client/ClientDestinationSlider";

interface DestinationsSectionProps {
  locale?: string;
}

const DestinationsSection = ({ locale = "en" }: DestinationsSectionProps) => {
  // Load translations directly using use()
  const translations: ITranslations = getTranslations(locale);
  const { destinations, tripIdeas } = translations.landing;

  const destinationSlides = [
    {
      id: 1,
      title: destinations.locations.india.title,
      content: destinations.locations.india.content,
      bg: "/images/india.png",
    },
    {
      id: 2,
      title: destinations.locations.maldives.title,
      content: destinations.locations.maldives.content,
      bg: "/images/maldives.png",
    },
    {
      id: 3,
      title: destinations.locations.nepal.title,
      content: destinations.locations.nepal.content,
      bg: "/images/nepal.png",
    },
    {
      id: 4,
      title: destinations.locations.bhutan.title,
      content: destinations.locations.bhutan.content,
      bg: "/images/bhutan.png",
    },
    {
      id: 5,
      title: destinations.locations.sriLanka.title,
      content: destinations.locations.sriLanka.content,
      bg: "/images/SRI_LANKA.webp",
    },
  ];

  return (
    <>
      <div className="my-12 max-w-screen-xl mx-auto pt-[30px]">
        <ClientDestinationSlider
          heading={destinations.heading}
          slides={destinationSlides}
          ctaText={destinations.cta}
          ctaButtonText={destinations.ctaButton}
        />
      </div>

      {/* Trip Ideas Section */}
      <div className="my-12 max-w-screen-xl mx-auto">
        <h2
          className="text-2xl font-semibold text-black text-center sm:text-left mx-2"
          style={{ fontSize: "32px" }}
        >
          {tripIdeas.heading}
        </h2>
      </div>

      <div className="flex flex-wrap justify-between gap-4 my-12 max-w-screen-xl mb-[120px] mx-0 sm:mx-auto sm:flex-nowrap">
        <div className="w-full sm:w-1/2 h-[430px] sm:h-[323px] relative rounded-[35px] overflow-hidden group">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{
              background: `linear-gradient(90deg, rgba(2, 92, 122, 0.8) 30%, rgba(3, 130, 173, 0.4) 60.32%, rgba(4, 169, 224, 0.4) 100%), url('/images/tajmahal.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="absolute inset-0 flex flex-col items-between justify-between text-white text-left p-6">
            <h3 className="text-[32px] font-semibold mb-2 sm:w-[60%] w-[80%] font-urbanist">
              {tripIdeas.indiaTrip.heading}
            </h3>
            <div>
              <p className="mb-4 sm:w-[60%] w-[80%] font-urbanist">
                {tripIdeas.indiaTrip.description}
              </p>
              <a href="/packages/royal-rajasthan-tour-package-india">
                <button className="px-4 py-4 font-normal sm:font-bold bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-[#fff] transition-all duration-300 w-[160px]">
                  {tripIdeas.indiaTrip.cta}
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 h-[430px] sm:h-[323px] relative rounded-[35px] overflow-hidden group">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{
              background: `linear-gradient(270deg, rgba(110, 151, 83, 0.6) 30%, rgba(110, 151, 83, 0.6) 60.32%, rgba(110, 151, 83, 0.95) 100%), url('/images/goldentemple.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="absolute inset-0 flex flex-col items-between justify-between text-white text-left p-6">
            <h3 className="text-[32px] font-semibold mb-2 sm:w-[60%] w-[80%] font-urbanist">
              {tripIdeas.amritsarTrip.heading}
            </h3>
            <div>
              <p className="mb-4 sm:w-[60%] w-[80%] font-urbanist">
                {tripIdeas.amritsarTrip.description}
              </p>
              <a href="/packages/north-india-temple-tour-package-india">
                <button className="px-4 py-4 font-normal sm:font-bold bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-[#fff] transition-all duration-300 w-[160px]">
                  {tripIdeas.amritsarTrip.cta}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationsSection;
