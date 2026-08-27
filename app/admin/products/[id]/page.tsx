"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/supabase";
import {
  productService,
  type UpdateProductInput,
} from "@/services/productService";
import { productImageService } from "@/services/productImageService";
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
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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
          brand: productData.brand ?? null,
          product_line: productData.productLine ?? null,
          package_size: productData.packageSize ?? null,
        });
      } catch {
        setError("Nem sikerült betölteni a terméket.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [params.id, router]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      setIsUploadingImage(true);

      const imageUrl = await productImageService.uploadImage(file);

      setFormData((current) => ({
        ...current,
        image_url: imageUrl,
      }));

      setSuccessMessage(
        "Az új kép feltöltve. A véglegesítéshez mentsd a módosításokat.",
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Nem sikerült feltölteni a képet.",
      );
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

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

    if (!formData.image_url) {
      setError("A termékhez kép megadása kötelező.");
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
        image_url: formData.image_url.trim(),
        category_id: formData.category_id,
        is_available: formData.is_available,
        is_featured: formData.is_featured,
        brand: formData.brand?.trim() || null,
        product_line: formData.product_line?.trim() || null,
        package_size: formData.package_size?.trim() || null,
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
        brand: updatedProduct.brand ?? null,
        product_line: updatedProduct.productLine ?? null,
        package_size: updatedProduct.packageSize ?? null,
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
            htmlFor="productImage"
            className="mb-2 block text-sm font-semibold"
          >
            Termékkép
          </label>

          {formData.image_url && (
            <div className="mb-4">
              <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border bg-gray-50">
                <Image
                  src={formData.image_url}
                  alt={formData.name ?? "Termékkép"}
                  fill
                  className="object-contain p-4"
                  sizes="384px"
                />
              </div>
            </div>
          )}

          <input
            id="productImage"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageUpload}
            disabled={isUploadingImage}
            className="block w-full rounded-md border px-3 py-2 text-sm"
          />

          <p className="mt-2 text-xs text-gray-500">
            JPG, PNG vagy WEBP. Maximum 5 MB. Új kép kiválasztásával
            lecserélheted a jelenlegi termékképet.
          </p>

          {isUploadingImage && (
            <p className="mt-3 text-sm font-medium text-blue-700">
              Kép feltöltése...
            </p>
          )}
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
            <label htmlFor="brand" className="mb-2 block text-sm font-semibold">
              Márka
            </label>

            <input
              id="brand"
              type="text"
              value={formData.brand ?? ""}
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
              value={formData.product_line ?? ""}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  product_line: event.target.value,
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
            value={formData.package_size ?? ""}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                package_size: event.target.value,
              }))
            }
            placeholder="pl. 1 L vagy 750 ml"
            className="w-full rounded-md border px-3 py-2"
          />
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
            disabled={isSaving || isUploadingImage}
            className="rounded-md bg-black px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Mentés..." : "Módosítások mentése"}
          </button>
        </div>
      </div>
    </main>
  );
}
