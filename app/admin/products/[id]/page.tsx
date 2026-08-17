"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/supabase";
import {
  productService,
  type UpdateProductInput,
} from "@/services/productService";
import { categoryService, type Category } from "@/services/categoryService";
import type { AdminProduct, Product } from "@/types/product";

export default function AdminProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<UpdateProductInput>({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      try {
        setError(null);

        const [productData, categoryData] = await Promise.all([
          productService.getAdminProductById(params.id),
          categoryService.getCategories(),
        ]);

        setProduct(productData);
        setCategories(categoryData);

        setFormData({
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          price: productData.price,
          unit: productData.unit,
          image_url: productData.imageUrl || null,
          category_id: productData.categoryId,
          is_available: productData.isAvailable ?? true,
          is_featured: productData.isFeatured ?? false,
        });
      } catch {
        setError("Nem sikerült betölteni a terméket.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [params.id, router]);

  const handleSave = async () => {
    if (!product) {
      return;
    }

    if (!formData.name?.trim()) {
      setError("A termék neve kötelező.");
      return;
    }

    if (!formData.slug?.trim()) {
      setError("A slug megadása kötelező.");
      return;
    }

    if (
      formData.price === undefined ||
      Number.isNaN(formData.price) ||
      formData.price < 0
    ) {
      setError("Adj meg érvényes árat.");
      return;
    }

    if (!formData.unit) {
      setError("Az egység megadása kötelező.");
      return;
    }

    if (!formData.category_id) {
      setError("A kategória kiválasztása kötelező.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const updatedProduct = await productService.updateProduct(product.id, {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description: formData.description?.trim() || null,
        price: formData.price,
        unit: formData.unit,
        image_url: formData.image_url?.trim() || null,
        category_id: formData.category_id,
        is_available: formData.is_available,
        is_featured: formData.is_featured,
      });

      setProduct(updatedProduct);

      setFormData({
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        description: updatedProduct.description,
        price: updatedProduct.price,
        unit: updatedProduct.unit,
        image_url: updatedProduct.imageUrl || null,
        category_id: updatedProduct.categoryId,
        is_available: updatedProduct.isAvailable ?? true,
        is_featured: updatedProduct.isFeatured ?? false,
      });

      setSuccessMessage("A termék módosításai sikeresen mentve.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Nem sikerült menteni a terméket.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <main className="p-8">Betöltés...</main>;
  }

  if (!product) {
    return (
      <main className="p-8">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="mb-6 text-sm underline"
        >
          ← Vissza a termékekhez
        </button>

        <p className="text-red-600">{error ?? "A termék nem található."}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <button
        type="button"
        onClick={() => router.push("/admin/products")}
        className="mb-6 text-sm underline"
      >
        ← Vissza a termékekhez
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Termék szerkesztése</h1>

        <p className="mt-1 text-sm text-gray-500">{product.name}</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          {successMessage}
        </div>
      )}

      <div className="space-y-6 rounded-xl border p-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            Terméknév
          </label>

          <input
            id="name"
            type="text"
            value={formData.name ?? ""}
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
            value={formData.slug ?? ""}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                slug: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2"
          />
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
            value={formData.description ?? ""}
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
          <label
            htmlFor="imageUrl"
            className="mb-2 block text-sm font-semibold"
          >
            Kép elérési útja
          </label>

          <input
            id="imageUrl"
            type="text"
            value={formData.image_url ?? ""}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                image_url: event.target.value,
              }))
            }
            placeholder="/images/products/termek.jpg"
            className="w-full rounded-md border px-3 py-2"
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
            value={formData.category_id ?? ""}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                category_id: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="" disabled>
              Válassz kategóriát
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-semibold">
              Ár (Ft)
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="1"
              value={formData.price ?? ""}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  price:
                    event.target.value === ""
                      ? undefined
                      : Number(event.target.value),
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
              value={formData.unit ?? "db"}
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
              checked={formData.is_available ?? false}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  is_available: event.target.checked,
                }))
              }
            />

            <span className="font-medium">A termék elérhető</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={formData.is_featured ?? false}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  is_featured: event.target.checked,
                }))
              }
            />

            <span className="font-medium">Kiemelt termék</span>
          </label>
        </div>

        <div className="flex justify-end border-t pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-black px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Mentés..." : "Módosítások mentése"}
          </button>
        </div>
      </div>
    </main>
  );
}
