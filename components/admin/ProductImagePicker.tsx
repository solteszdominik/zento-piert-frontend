"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

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

const PAGE_SIZE = 12;

export default function ProductImagePicker({
  value,
  onChange,
}: ProductImagePickerProps) {
  const [images, setImages] = useState<ProductStorageImage[]>([]);

  const [selectedFolder, setSelectedFolder] =
    useState<ProductImageFolder>("6-egyebek");

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Megakadályozza, hogy egy régebbi kérés felülírja
  // az időközben kiválasztott másik mappa képeit.
  const requestRef = useRef(0);

  const loadFolderImages = async (folder: ProductImageFolder) => {
    const requestId = ++requestRef.current;

    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const data = await productImageService.getImagesByFolder(folder);

      if (requestId !== requestRef.current) return;

      setImages(data);
    } catch (error) {
      if (requestId !== requestRef.current) return;

      setError(
        error instanceof Error
          ? error.message
          : "Nem sikerült betölteni a képeket.",
      );
    } finally {
      if (requestId === requestRef.current) {
        setIsLoading(false);
      }
    }
  };

  const handleGalleryToggle = () => {
    if (isGalleryOpen) {
      requestRef.current += 1;
      setIsGalleryOpen(false);
      setImages([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsGalleryOpen(true);
    setPage(1);
    setSearch("");

    void loadFolderImages(selectedFolder);
  };

  const handleFolderChange = (folder: ProductImageFolder) => {
    setSelectedFolder(folder);
    setPage(1);
    setSearch("");

    if (isGalleryOpen) {
      void loadFolderImages(folder);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setError(null);
      setIsUploading(true);

      const imageUrl = await productImageService.uploadImage(
        file,
        selectedFolder,
      );

      onChange(imageUrl);

      // Az új kép már ki van választva.
      // Nem kell emiatt újra lekérni a teljes képtárat.
      requestRef.current += 1;
      setIsGalleryOpen(false);
      setImages([]);
      setIsLoading(false);
      setSearch("");
      setPage(1);
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

    if (!normalizedSearch) return images;

    return images.filter((image) =>
      image.name.toLowerCase().includes(normalizedSearch),
    );
  }, [images, search]);

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / PAGE_SIZE));

  const currentPage = Math.min(page, totalPages);

  const visibleImages = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredImages.slice(start, start + PAGE_SIZE);
  }, [filteredImages, currentPage]);

  return (
    <div className="space-y-6">
      {/* ÚJ KÉP FELTÖLTÉSE */}
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
            disabled={isUploading}
            onChange={(event) =>
              handleFolderChange(event.target.value as ProductImageFolder)
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
          JPG, PNG vagy WebP, legfeljebb 20 MB. Feltöltés előtt automatikusan
          WebP-re optimalizáljuk.
        </p>

        {isUploading && (
          <p className="mt-3 text-sm font-medium text-blue-700">
            Kép optimalizálása és feltöltése...
          </p>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* MEGLÉVŐ KÉPEK */}
      <div className="rounded-xl border p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold">Meglévő kép kiválasztása</h3>

            <p className="mt-1 text-xs text-gray-500">
              A képek csak a képtár megnyitásakor töltődnek be.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGalleryToggle}
            disabled={isUploading}
            aria-expanded={isGalleryOpen}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50"
          >
            {isGalleryOpen ? "Képtár bezárása" : "Képtár megnyitása"}
          </button>
        </div>

        {isGalleryOpen && (
          <div className="mt-5 space-y-4 border-t pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-slate-700">
                {
                  PRODUCT_IMAGE_FOLDERS.find(
                    (folder) => folder.value === selectedFolder,
                  )?.label
                }
              </p>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => void loadFolderImages(selectedFolder)}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 disabled:opacity-50"
              >
                Frissítés
              </button>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Keresés a mappa képei között..."
              className="w-full rounded-md border px-3 py-2 text-sm"
            />

            {isLoading ? (
              <p className="py-6 text-center text-sm text-slate-500">
                Képek betöltése...
              </p>
            ) : filteredImages.length === 0 ? (
              <div className="rounded-lg border border-dashed p-5 text-center">
                <p className="text-sm text-gray-500">
                  Nincs a keresésnek megfelelő kép ebben a mappában.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-500">
                  {filteredImages.length} kép található. Egyszerre {PAGE_SIZE}{" "}
                  képet jelenítünk meg.
                </p>

                <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-2 sm:grid-cols-3 md:grid-cols-4">
                  {visibleImages.map((image) => {
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
                            loading="lazy"
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

                {totalPages > 1 && (
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setPage((current) => current - 1)}
                      className="rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Előző
                    </button>

                    <span className="text-sm text-slate-600">
                      {currentPage} / {totalPages}. oldal
                    </span>

                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() => setPage((current) => current + 1)}
                      className="rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Következő →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* JELENLEG KIVÁLASZTOTT KÉP */}
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
