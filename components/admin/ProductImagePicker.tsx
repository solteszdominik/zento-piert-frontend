"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  PRODUCT_IMAGE_FOLDERS,
  productImageService,
  type ProductImageFolder,
  type ProductStorageImage,
} from "@/services/productImageService";

interface ProductImagePickerProps {
  value: string;
  onChange: (imageUrl: string) => void;
}

type ImageFilter = "all" | ProductImageFolder;

export default function ProductImagePicker({
  value,
  onChange,
}: ProductImagePickerProps) {
  const [images, setImages] = useState<ProductStorageImage[]>([]);

  const [selectedFolder, setSelectedFolder] =
    useState<ProductImageFolder>("6-egyebek");

  const [filter, setFilter] = useState<ImageFilter>("all");

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadImages = async () => {
    try {
      setError(null);
      setIsLoading(true);

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

      const imageUrl = await productImageService.uploadImage(
        file,
        selectedFolder,
      );

      onChange(imageUrl);

      await loadImages();
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

  const filteredImages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return images.filter((image) => {
      if (filter !== "all" && image.folder !== filter) {
        return false;
      }

      if (
        normalizedSearch &&
        !image.name.toLowerCase().includes(normalizedSearch)
      ) {
        return false;
      }

      return true;
    });
  }, [images, filter, search]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gray-50 p-3 sm:p-4">
        <h3 className="mb-4 text-sm font-semibold">Új kép feltöltése</h3>

        <div className="mb-4">
          <label
            htmlFor="imageFolder"
            className="mb-2 block text-sm font-medium"
          >
            Mappa
          </label>

          <select
            id="imageFolder"
            value={selectedFolder}
            onChange={(event) =>
              setSelectedFolder(event.target.value as ProductImageFolder)
            }
            className="w-full rounded-md border bg-white px-3 py-2"
          >
            {PRODUCT_IMAGE_FOLDERS.map((folder) => (
              <option key={folder.value} value={folder.value}>
                {folder.label}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleUpload}
          disabled={isUploading}
          className="block w-full rounded-md border bg-white px-3 py-2 text-sm"
        />

        <p className="mt-2 text-xs text-gray-500">
          JPG, PNG vagy WEBP. Maximum 5 MB.
        </p>

        {isUploading && (
          <p className="mt-3 text-sm font-medium text-blue-700">
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
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Meglévő kép kiválasztása</h3>

          {!isLoading && (
            <p className="mt-1 text-xs text-gray-500">
              {images.length} feltöltött termékkép
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              filter === "all"
                ? "bg-blue-700 text-white"
                : "border bg-white text-gray-700 hover:border-blue-300"
            }`}
          >
            Összes
          </button>

          {PRODUCT_IMAGE_FOLDERS.map((folder) => (
            <button
              key={folder.value}
              type="button"
              onClick={() => setFilter(folder.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                filter === folder.value
                  ? "bg-blue-700 text-white"
                  : "border bg-white text-gray-700 hover:border-blue-300"
              }`}
            >
              {folder.label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Keresés fájlnév alapján..."
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-500">Képek betöltése...</p>
        ) : filteredImages.length === 0 ? (
          <div className="rounded-lg border border-dashed p-5 text-center">
            <p className="text-sm text-gray-500">
              Nincs a szűrésnek megfelelő kép.
            </p>
          </div>
        ) : (
          <div className="grid max-h-[550px] grid-cols-2 gap-3 overflow-y-auto rounded-xl border bg-gray-50 p-3 sm:grid-cols-3 md:grid-cols-4">
            {filteredImages.map((image) => {
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
                      className="truncate text-xs text-gray-700"
                      title={image.name}
                    >
                      {image.name}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-gray-400">
                      {
                        PRODUCT_IMAGE_FOLDERS.find(
                          (folder) => folder.value === image.folder,
                        )?.label
                      }
                    </p>

                    {isSelected && (
                      <p className="mt-1 text-xs font-semibold text-blue-700">
                        ✓ Kiválasztva
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
          <p className="mb-2 text-sm font-semibold">Kiválasztott termékkép</p>

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
