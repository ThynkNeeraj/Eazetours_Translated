"use client";

import { useRef, useState } from "react";

const videoData = [
  {
    id: 1,
    title: "Great experience with Eaze Tours!",
    videoUrl: "/video/Eazetour_review_1.mp4",
  },
  {
    id: 2,
    title: "Excellent Service and Support",
    videoUrl: "/video/Eazetour_review_2.mp4",
  },
  {
    id: 3,
    title: "Highly Recommend Their Packages",
    videoUrl: "/video/Eazetour_review_3.mp4",
  },
];

export default function TestimonialVideoSection() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingVideos, setPlayingVideos] = useState<boolean[]>(
    Array(videoData.length).fill(false)
  );

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video && !video.paused) {
        video.pause();
        video.removeAttribute("controls");
      }
    });

    const selectedVideo = videoRefs.current[index];
    if (selectedVideo) {
      selectedVideo.play();
      selectedVideo.setAttribute("controls", "true");
      setPlayingVideos((prev) => prev.map((_, i) => i === index));
    }
  };

  return (
    <div className="video-section w-full px-6 lg:px-7 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoData.map((video, index) => (
          <div
            key={video.id}
            className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform transform hover:scale-105"
          >
            <div
          className="relative w-full bg-black cursor-pointer"
          style={{ aspectRatio: "3 / 4" }}
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

            {/* <div className="bg-white px-5 py-4 text-center rounded-b-2xl">
              <p className="text-lg font-semibold text-[#025C7A]">{video.title}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
