"use client";

import React, { useState, useRef, useEffect } from "react";

interface Testimonial {
  name: string;
  location: string;
  content: string;
  img: string;
  rating: number;
}

interface ClientTestimonialSliderProps {
  heading: string;
  testimonials: Testimonial[];
  ctaText: string;
}

const ClientTestimonialSlider = ({
  heading,
  testimonials,
  ctaText,
}: ClientTestimonialSliderProps) => {
  const testimonialSliderRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const handleNextTestimonial = () => {
    setTestimonialIndex(prevIndex => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0));
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1));
  };

  const testimonialToIndex = (sliderRef: React.RefObject<HTMLDivElement>, index: number) => {
    if (sliderRef.current) {
      // Get the current screen width
      const screenWidth = window.innerWidth;
      // Determine the width of each slide based on screen size
      let slideWidth;
      if (screenWidth <= 768) {
        // Mobile view
        slideWidth = 100; // Adjust for padding/margins
      } else {
        // Desktop view
        slideWidth = 33.3; // Default width for desktop
      }
      // Apply the transformation
      sliderRef.current.style.transition = "transform 0.4s ease-in-out";
      sliderRef.current.style.transform = `translateX(-${index * slideWidth}%)`;
    }
  };

  useEffect(() => {
    testimonialToIndex(testimonialSliderRef, testimonialIndex); // Slide to the current index for testimonials
  }, [testimonialIndex]);

  return (
    <>
      <div className="flex text-center sm:text-left mb-4 flex-wrap justify-center gap-4 mx-12 sm:justify-between sm:gap-0">
        <h2 className="text-2xl font-semibold text-black" style={{ fontSize: "32px" }}>
          {heading}
        </h2>

        <div className="flex gap-4 z-[100]">
          <button
            onClick={handlePrevTestimonial}
            className="bg-[#E4F8FF] text-2xl text-[#025C7A] py-[10px] px-5 rounded-full hover:bg-gray-700 hover:text-[#fff] transition-all duration-300"
          >
            &#10094;
          </button>
          <button
            onClick={handleNextTestimonial}
            className="bg-[#E4F8FF] text-2xl text-[#025C7A] py-[10px] px-5 rounded-full hover:bg-gray-700 hover:text-[#fff] transition-all duration-300"
          >
            &#10095;
          </button>
        </div>
      </div>

      <div className="testimonial-slider-container mb-12 relative">
        <div className="testimonial-slider relative overflow-hidden mx-auto sm:mx-4">
          <div
            className="testimonial-slider-wrapper flex transition-transform duration-300 ease-in-out"
            ref={testimonialSliderRef}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-box flex flex-col justify-between relative flex-shrink-0 w-[calc(100%-24px)] sm:w-[392px] m-3 bg-white rounded-[30px] shadow-[0px_0px_21.9px_0px_#00000029] overflow-visible group p-10"
              >
                <div className="flex justify-start gap-3 items-center mb-4">
                  <div className="w-[60px] h-[60px] p-2 bg-[#025C7A] rounded-full overflow-hidden">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-[#000] font-500">{testimonial.location}</p>
                  </div>
                </div>

                <p className="text-[#777777] mb-4 text-justify">{testimonial.content}</p>

                <div className="flex justify-start items-center">
                  <p className="text-gray-700 text-[18px] mr-2">5.0</p>
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-[#FE7831] font-500 text-[22px]">
                      &#9733;
                    </span>
                  ))}
                  {Array.from({ length: 5 - testimonial.rating }, (_, i) => (
                    <span key={i + testimonial.rating} className="text-gray-300 text-[18px]">
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center my-12">
        <a href="/testimonials">
          <button className="px-8 py-4 mt-4 mb-12 border-2 border-[#025C7A] bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-white transition-all duration-300">
            {ctaText}
          </button>
        </a>
      </div>
    </>
  );
};

export default ClientTestimonialSlider;
