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

const videoData = [
  {
    id: 1,
    title: "Great experience with Eaze Tours!",
    videoUrl: "/video/Eazetour_review_1.mp4",
    thumbnail: "/images/37/1.jpg",
  },
  {
    id: 2,
    title: "Excellent Service and Support",
    videoUrl: "/video/Eazetour_review_2.mp4",
    thumbnail: "/images/37/1.jpg",
  },
  {
    id: 3,
    title: "Highly Recommend Their Packages",
    videoUrl: "/video/Eazetour_review_3.mp4",
    thumbnail: "/images/37/1.jpg",
  },
];

const ClientTestimonialSlider = ({
  heading,
  testimonials,
  ctaText,
}: ClientTestimonialSliderProps) => {
  const testimonialSliderRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingVideos, setPlayingVideos] = useState<boolean[]>(
    Array(videoData.length).fill(false)
  );

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i !== index) {
          video.pause();
          video.currentTime = 0;
          video.removeAttribute("controls");
        }
      }
    });

    const selectedVideo = videoRefs.current[index];
    if (selectedVideo) {
      selectedVideo.play();
      selectedVideo.setAttribute("controls", "true");
      setPlayingVideos(videoRefs.current.map((_, i) => i === index));
    }
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prevIndex) =>
      prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1
    );
  };

  const testimonialToIndex = (
    sliderRef: React.RefObject<HTMLDivElement>,
    index: number
  ) => {
    if (sliderRef.current) {
      const screenWidth = window.innerWidth;
      const slideWidth = screenWidth <= 768 ? 100 : 33.3;
      sliderRef.current.style.transition = "transform 0.4s ease-in-out";
      sliderRef.current.style.transform = `translateX(-${index * slideWidth}%)`;
    }
  };

  useEffect(() => {
    testimonialToIndex(testimonialSliderRef, testimonialIndex);
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

      {/* Testimonial Slider */}
      <div className="testimonial-slider-container mb-2 relative">
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

     {/* Video Section */}
<div className="video-section w-full px-6 lg:px-12 py-2">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {videoData.map((video, index) => (
      <div
        key={video.id}
        className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform transform hover:scale-105"
      >
        <div
          className="relative w-full aspect-video bg-black cursor-pointer"
          onClick={() => handlePlay(index)}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl"
            preload="metadata"
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>

          {!playingVideos[index] && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#025C7A]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white px-5 py-4 text-center rounded-b-2xl">
          <p className="text-lg font-semibold text-[#025C7A]">{video.title}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Call to Action */}
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
