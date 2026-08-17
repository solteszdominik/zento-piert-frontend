import type { ProductCategory } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL");
}

export interface Category {
  id: string;
  name: string;
  slug: ProductCategory;
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/categories`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json() as Promise<Category[]>;
  },
};
