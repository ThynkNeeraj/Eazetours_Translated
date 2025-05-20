"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ClientHeroSlider = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted) {
        videoRef.current.play().catch(err => console.error("Autoplay blocked:", err));
      }
    }
  };

  // Update video source based on screen size
  useEffect(() => {
    const updateVideoSrc = () => {
      const newSrc =
        window.innerWidth <= 768 ? "/video/Eazetour_Mobile_Format.mp4" : "/video/Eaze_mp4.mp4";

      if (videoSrc !== newSrc) {
        setVideoSrc(newSrc);
        setVideoKey(prevKey => prevKey + 1);
        setReloadCount(prev => prev + 1);
      }
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, [videoSrc]);

  // Auto-mute after 5 reloads
  useEffect(() => {
    if (reloadCount >= 5) {
      setIsMuted(true);
    }
  }, [reloadCount]);

  // Auto-mute when out of view
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure video loops correctly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", () => {
        videoRef.current!.currentTime = 0;
        videoRef.current!.play();
      });
    }
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        key={videoKey}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
      >
        <SwiperSlide>
          <div className="relative h-[750px] sm:h-[100vh] w-full">
            <div className="absolute inset-0 bg-black opacity-0 z-10"></div>

            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                loop
                muted={isMuted}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={toggleAudio}
              className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-lg text-black text-sm z-[100]"
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ClientHeroSlider;
