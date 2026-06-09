"use client";

import { categories } from "@/data/categories";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const search = searchParams.get("search") ?? "";

  return (
    <div className="mb-10 space-y-6">
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
      </form>

      <div className="flex flex-wrap gap-3">
        <Link
          href={search ? `/products?search=${search}` : "/products"}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            !selectedCategory
              ? "bg-blue-700 text-white"
              : "border border-blue-100 bg-white text-blue-900 hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          Összes
        </Link>

        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          const href = search
            ? `/products?category=${category.id}&search=${search}`
            : `/products?category=${category.id}`;

          return (
            <Link
              key={category.id}
              href={href}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
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
  );
}
