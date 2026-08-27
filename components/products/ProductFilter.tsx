"use client";

import { categories } from "@/data/categories";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const selectedBrand = searchParams.get("brand");
  const search = searchParams.get("search") ?? "";

  const buildHref = ({
    category,
    brand,
  }: {
    category?: string | null;
    brand?: string | null;
  }) => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    if (brand) {
      params.set("brand", brand);
    }

    if (search) {
      params.set("search", search);
    }

    const query = params.toString();

    return query ? `/products?${query}` : "/products";
  };

  return (
    <div className="mb-8 space-y-5 sm:mb-10 sm:space-y-6">
      <form className="max-w-xl">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Keresés terméknév alapján..."
          className="w-full rounded-full border border-blue-100 bg-white px-5 py-3 text-sm text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400"
        />

        {selectedCategory && (
          <input type="hidden" name="category" value={selectedCategory} />
        )}

        {selectedBrand && (
          <input type="hidden" name="brand" value={selectedBrand} />
        )}
      </form>

      <div>
        <p className="mb-3 text-sm font-semibold text-blue-950">Márka</p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={buildHref({
              category: selectedCategory,
              brand: null,
            })}
            className={`rounded-full px-3.5 py-2 text-xs sm:px-5 sm:text-sm font-semibold transition ${
              !selectedBrand
                ? "bg-blue-700 text-white"
                : "border border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            Összes márka
          </Link>

          <Link
            href={buildHref({
              category: selectedCategory,
              brand: "Sano",
            })}
            className={`rounded-full px-3.5 py-2 text-xs sm:px-5 sm:text-sm font-semibold transition ${
              selectedBrand?.toLowerCase() === "sano"
                ? "bg-blue-700 text-white"
                : "border border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            Sano
          </Link>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-blue-950">Kategória</p>

        <div className="flex flex-wrap gap-3">
          <Link
            href={buildHref({
              category: null,
              brand: selectedBrand,
            })}
            className={`rounded-full px-3.5 py-2 text-xs sm:px-5 sm:text-sm font-semibold transition ${
              !selectedCategory
                ? "bg-blue-700 text-white"
                : "border border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            Összes
          </Link>

          {categories.map((category) => {
            const isActive = selectedCategory === category.id;

            return (
              <Link
                key={category.id}
                href={buildHref({
                  category: category.id,
                  brand: selectedBrand,
                })}
                className={`rounded-full px-3.5 py-2 text-xs sm:px-5 sm:text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "border border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
