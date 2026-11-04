"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

interface ProductImageLightboxProps {
  src: string;
  alt: string;
}

export default function ProductImageLightbox({
  src,
  alt,
}: ProductImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`${alt} kép nagyítása`}
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[1.25rem] bg-slate-50 sm:rounded-[1.5rem]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105 sm:p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-blue-950 shadow-sm">
          <ZoomIn size={16} />
          Nagyítás
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} nagyított képe`}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Kép bezárása"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white text-slate-900 transition hover:bg-slate-200 sm:right-8 sm:top-8"
          >
            <X size={24} />
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative h-[85vh] w-full max-w-6xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
