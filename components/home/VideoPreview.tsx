"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://zkybuuofvakaajhlvpwk.supabase.co/storage/v1/object/public/videos/zento-piert.mp4";

export default function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Egyes böngészők blokkolhatják az autoplay-t,
            // de muted videónál ez általában működik.
          });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
        <div className="rounded-[1.5rem] bg-blue-50 p-3 shadow-sm sm:rounded-[2rem] sm:p-4">
          <div className="overflow-hidden rounded-[1.25rem] bg-blue-950 sm:rounded-[1.5rem]">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              controls
              className="aspect-video w-full object-cover"
            >
              <source src={VIDEO_URL} type="video/mp4" />A böngésződ nem
              támogatja a videólejátszást.
            </video>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Bemutatkozó videó
          </p>

          <h2 className="mb-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
            Ismerd meg közelebbről a Zentó–Piért Kft. mindennapjait, gyártási
            környezetét és termékkínálatát egy rövid bemutató videón keresztül.
          </h2>

          <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Tekints be működésünkbe, és ismerd meg közelebbről termékeinket,
            valamint a Zentó-Piért mindennapi munkáját.
          </p>
        </div>
      </div>
    </section>
  );
}
