import type { Product, ProductCategory } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL");
}

interface ApiCategory {
  id: string;
  name: string;
  slug: ProductCategory;
}

interface ApiProduct {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  price: number | string;
  unit: Product["unit"];
  is_featured: boolean;
  categories: ApiCategory;
}

function mapApiProduct(product: ApiProduct): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.categories.slug,
    description: product.description ?? "",
    price: Number(product.price),
    imageUrl: product.image_url ?? "",
    isFeatured: product.is_featured,
    isAvailable: product.is_available,
    unit: product.unit,
  };
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = (await response.json()) as ApiProduct[];

    return data.map(mapApiProduct);
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = (await response.json()) as ApiProduct;

    return mapApiProduct(data);
  },
};
