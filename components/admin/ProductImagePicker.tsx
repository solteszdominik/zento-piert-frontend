"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  productImageService,
  type ProductStorageImage,
} from "@/services/productImageService";

interface ProductImagePickerProps {
  value: string;
  onChange: (imageUrl: string) => void;
}

export default function ProductImagePicker({
  value,
  onChange,
}: ProductImagePickerProps) {
  const [images, setImages] = useState<ProductStorageImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setError(null);

        const data = await productImageService.getImages();
        setImages(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Nem sikerült betölteni a képeket.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setError(null);
      setIsUploading(true);

      const imageUrl = await productImageService.uploadImage(file);

      onChange(imageUrl);

      const refreshedImages = await productImageService.getImages();
      setImages(refreshedImages);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Nem sikerült feltölteni a képet.",
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Új kép feltöltése
        </label>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleUpload}
          disabled={isUploading}
          className="block w-full rounded-md border px-3 py-2 text-sm"
        />

        <p className="mt-2 text-xs text-gray-500">
          JPG, PNG vagy WEBP. Maximum 5 MB.
        </p>

        {isUploading && (
          <p className="mt-2 text-sm font-medium text-blue-700">
            Kép feltöltése...
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Meglévő kép kiválasztása</h3>

          {!isLoading && (
            <span className="text-xs text-gray-500">{images.length} kép</span>
          )}
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-500">Képek betöltése...</p>
        ) : images.length === 0 ? (
          <p className="text-sm text-gray-500">Még nincs feltöltött kép.</p>
        ) : (
          <div className="grid max-h-[500px] grid-cols-2 gap-3 overflow-y-auto rounded-xl border bg-gray-50 p-3 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image) => {
              const isSelected = value === image.publicUrl;

              return (
                <button
                  key={image.path}
                  type="button"
                  onClick={() => onChange(image.publicUrl)}
                  className={`group overflow-hidden rounded-lg border bg-white text-left transition ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={image.publicUrl}
                      alt={image.name}
                      fill
                      className="object-contain p-2"
                      sizes="160px"
                    />
                  </div>

                  <div className="border-t px-2 py-2">
                    <p
                      className="truncate text-xs text-gray-600"
                      title={image.name}
                    >
                      {image.name}
                    </p>

                    {isSelected && (
                      <p className="mt-1 text-xs font-semibold text-blue-700">
                        Kiválasztva
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {value && (
        <div>
          <p className="mb-2 text-sm font-semibold">
            Jelenlegi kiválasztott kép
          </p>

          <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border bg-gray-50">
            <Image
              src={value}
              alt="Kiválasztott termékkép"
              fill
              className="object-contain p-4"
              sizes="384px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
