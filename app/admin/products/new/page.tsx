"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/supabase";
import {
  productService,
  type CreateProductInput,
} from "@/services/productService";
import { categoryService, type Category } from "@/services/categoryService";
import type { Product } from "@/types/product";
import ProductImagePicker from "@/components/admin/ProductImagePicker";

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  unit: Product["unit"];
  imageUrl: string;
  categoryId: string;
  isAvailable: boolean;
  isFeatured: boolean;
  brand: string;
  productLine: string;
  packageSize: string;
}

const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  price: "",
  unit: "db",
  imageUrl: "",
  categoryId: "",
  isAvailable: true,
  isFeatured: false,
  brand: "",
  productLine: "",
  packageSize: "",
};

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch {
        setError("Nem sikerült betölteni a kategóriákat.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, [router]);

  const handleCreate = async () => {
    setError(null);

    const name = formData.name.trim();
    const slug = formData.slug.trim();
    const price = Number(formData.price);

    if (!name) {
      setError("A termék neve kötelező.");
      return;
    }

    if (!slug) {
      setError("A slug megadása kötelező.");
      return;
    }

    if (!formData.categoryId) {
      setError("A kategória kiválasztása kötelező.");
      return;
    }

    if (formData.price.trim() === "" || Number.isNaN(price) || price < 0) {
      setError("Adj meg érvényes árat.");
      return;
    }

    if (!formData.imageUrl) {
      setError("Válassz vagy tölts fel képet a termékhez.");
      return;
    }

    const payload: CreateProductInput = {
      name,
      slug,
      description: formData.description.trim() || null,
      price,
      unit: formData.unit,
      image_url: formData.imageUrl,
      category_id: formData.categoryId,
      is_available: formData.isAvailable,
      is_featured: formData.isFeatured,
      brand: formData.brand.trim() || null,
      product_line: formData.productLine.trim() || null,
      package_size: formData.packageSize.trim() || null,
    };

    try {
      setIsSaving(true);

      const product = await productService.createProduct(payload);

      router.push(`/admin/products/${product.id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Nem sikerült létrehozni a terméket.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <main className="px-4 py-6 sm:px-6 sm:py-8">Betöltés...</main>;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        type="button"
        onClick={() => router.push("/admin/products")}
        className="mb-6 text-sm underline"
      >
        ← Vissza a termékekhez
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Új termék</h1>

        <p className="mt-1 text-sm text-gray-500">
          Új termék felvétele a webshopba.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-5 rounded-xl border p-4 sm:space-y-6 sm:p-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            Terméknév
          </label>

          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-2 block text-sm font-semibold">
            Slug
          </label>

          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                slug: event.target.value,
              }))
            }
            placeholder="pelda-termek"
            className="w-full rounded-md border px-3 py-2"
          />

          <p className="mt-1 text-xs text-gray-500">
            Kisbetű, szám és kötőjel használható.
          </p>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold"
          >
            Leírás
          </label>

          <textarea
            id="description"
            rows={5}
            value={formData.description}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <p className="mb-3 block text-sm font-semibold">Termékkép</p>

          <ProductImagePicker
            value={formData.imageUrl}
            onChange={(imageUrl) =>
              setFormData((current) => ({
                ...current,
                imageUrl,
              }))
            }
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold"
          >
            Kategória
          </label>

          <select
            id="category"
            value={formData.categoryId}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                categoryId: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Válassz kategóriát</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="brand" className="mb-2 block text-sm font-semibold">
              Márka
            </label>

            <input
              id="brand"
              type="text"
              value={formData.brand}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  brand: event.target.value,
                }))
              }
              placeholder="pl. Sano"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="productLine"
              className="mb-2 block text-sm font-semibold"
            >
              Termékcsalád
            </label>

            <input
              id="productLine"
              type="text"
              value={formData.productLine}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  productLine: event.target.value,
                }))
              }
              placeholder="pl. Spark"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="packageSize"
            className="mb-2 block text-sm font-semibold"
          >
            Kiszerelés
          </label>

          <input
            id="packageSize"
            type="text"
            value={formData.packageSize}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                packageSize: event.target.value,
              }))
            }
            placeholder="pl. 1 L vagy 750 ml"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-semibold">
              Ár (Ft)
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="1"
              value={formData.price}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  price: event.target.value,
                }))
              }
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="unit" className="mb-2 block text-sm font-semibold">
              Egység
            </label>

            <select
              id="unit"
              value={formData.unit}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  unit: event.target.value as Product["unit"],
                }))
              }
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="db">db</option>
              <option value="csomag">csomag</option>
              <option value="lap">lap</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  isAvailable: event.target.checked,
                }))
              }
            />

            <span className="font-medium">A termék elérhető</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  isFeatured: event.target.checked,
                }))
              }
            />

            <span className="font-medium">Kiemelt termék</span>
          </label>
        </div>

        <div className="flex border-t pt-6 sm:justify-end">
          <button
            type="button"
            onClick={handleCreate}
            disabled={isSaving}
            className="w-full rounded-md bg-black px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isSaving ? "Létrehozás..." : "Termék létrehozása"}
          </button>
        </div>
      </div>
    </main>
  );
}
