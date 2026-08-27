"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  productImageService,
  type ProductStorageImage,
} from "@/services/productImageService";

interface ShowcaseItem {
  title: string;
  description: string;
  fileName: string;
}

const sanoShowcaseItems: ShowcaseItem[] = [
  {
    title: "Maxima mosóparfümök",
    description:
      "Válogatott Sano Maxima illatok a hosszan tartó frissességért.",
    fileName: "maxima-trio.jpeg",
  },
  {
    title: "Maxima Duo",
    description: "Népszerű Maxima termékek páros összeállításban.",
    fileName: "maxima-bioduo.jpeg",
  },
  {
    title: "Sano mosogatás",
    description: "Hatékony megoldások a mindennapi mosogatáshoz.",
    fileName: "dishwash-trio.jpeg",
  },
  {
    title: "Sano felülettisztítás",
    description: "Praktikus tisztítószerek az otthon különböző felületeire.",
    fileName: "surf-trio.jpeg",
  },
  {
    title: "Sano toalett tisztítás",
    description:
      "Komplett választék a fürdőszoba és a toalett tisztán tartásához.",
    fileName: "toilet-quad.jpeg",
  },
  {
    title: "Sano Oxygen",
    description: "Sano Oxygen termékek a makacs szennyeződések kezeléséhez.",
    fileName: "oxygen-duo.jpeg",
  },
];

export default function SanoShowcase() {
  const [images, setImages] = useState<ProductStorageImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const sanoImages =
          await productImageService.getImagesByFolder("5-sano");

        setImages(sanoImages);
      } catch (error) {
        console.error("Nem sikerült betölteni a Sano showcase képeket:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const getImage = (fileName: string) => {
    return images.find(
      (image) => image.name.toLowerCase() === fileName.toLowerCase(),
    );
  };

  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Sano termékek
            </p>

            <h2 className="text-3xl font-bold text-blue-950 md:text-4xl">
              Prémium tisztaság a mindennapokra
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Fedezd fel válogatott Sano mosási, mosogatási és tisztítási
              megoldásainkat.
            </p>
          </div>

          <Link
            href="/products?brand=sano"
            className="w-fit rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Összes Sano termék →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sanoShowcaseItems.map((item) => (
              <div
                key={item.fileName}
                className="overflow-hidden rounded-3xl border border-blue-100 bg-white"
              >
                <div className="aspect-[4/3] animate-pulse bg-slate-100" />

                <div className="p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="mt-3 h-4 animate-pulse rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sanoShowcaseItems.map((item) => {
              const image = getImage(item.fileName);

              if (!image) {
                return null;
              }

              return (
                <Link
                  key={item.fileName}
                  href="/products?brand=sano"
                  className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={image.publicUrl}
                      alt={item.title}
                      fill
                      className="object-contain p-6 transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="border-t border-blue-50 p-6">
                    <h3 className="text-xl font-bold text-blue-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <p className="mt-5 text-sm font-semibold text-blue-700">
                      Sano termékek megtekintése →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
