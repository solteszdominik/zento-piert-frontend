"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/supabase";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

export default function AdminProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch {
        setError("Nem sikerült betölteni a termékeket.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [router]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.slug.toLowerCase().includes(normalizedSearch),
    );
  }, [products, search]);

  if (isLoading) {
    return <main className="p-8">Betöltés...</main>;
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="mb-6 text-sm underline"
          >
            ← Vissza az adminhoz
          </button>

          <h1 className="text-3xl font-bold">Termékek</h1>

          <p className="mt-1 text-sm text-gray-500">Termékek kezelése</p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/products/new")}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Új termék
        </button>
      </div>

      {error && <p className="mb-6 text-red-600">{error}</p>}

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Keresés terméknévre..."
          className="w-full max-w-md rounded-md border px-3 py-2"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>Nincs találat.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3">Termék</th>

                <th className="px-4 py-3">Kategória</th>

                <th className="px-4 py-3">Ár</th>

                <th className="px-4 py-3">Egység</th>

                <th className="px-4 py-3">Elérhető</th>

                <th className="px-4 py-3">Kiemelt</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => router.push(`/admin/products/${product.id}`)}
                  className="cursor-pointer border-b transition hover:bg-gray-50 last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{product.name}</td>

                  <td className="px-4 py-3">{product.category}</td>

                  <td className="px-4 py-3">{formatPrice(product.price)}</td>

                  <td className="px-4 py-3">{product.unit}</td>

                  <td className="px-4 py-3">
                    {product.isAvailable ? "Igen" : "Nem"}
                  </td>

                  <td className="px-4 py-3">
                    {product.isFeatured ? "Igen" : "Nem"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
