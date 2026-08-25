import { supabase } from "@/lib/supabase/supabase";
import type { AdminProduct, Product, ProductCategory } from "@/types/product";

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
  brand: string | null;
  product_line: string | null;
  package_size: string | null;
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string | null;
  price?: number;
  unit?: Product["unit"];
  image_url?: string | null;
  is_available?: boolean;
  is_featured?: boolean;
  category_id?: string;
  brand?: string | null;
  product_line?: string | null;
  package_size?: string | null;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  unit: Product["unit"];
  image_url?: string | null;
  is_available: boolean;
  is_featured: boolean;
  category_id: string;
  brand?: string | null;
  product_line?: string | null;
  package_size?: string | null;
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
    brand: product.brand ?? undefined,
    productLine: product.product_line ?? undefined,
    packageSize: product.package_size ?? undefined,
  };
}

function mapApiAdminProduct(product: ApiProduct): AdminProduct {
  return {
    ...mapApiProduct(product),
    categoryId: product.category_id,
  };
}

async function getAdminToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session.access_token;
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

  async getAdminProductById(id: string): Promise<AdminProduct> {
    const token = await getAdminToken();

    const response = await fetch(`${API_URL}/products/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = (await response.json()) as ApiProduct;

    return mapApiAdminProduct(data);
  },

  async updateProduct(
    id: string,
    input: UpdateProductInput,
  ): Promise<AdminProduct> {
    const token = await getAdminToken();

    const response = await fetch(`${API_URL}/products/id/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.message ?? "Failed to update product");
    }

    const result = await response.json();

    return mapApiAdminProduct(result.data as ApiProduct);
  },

  async createProduct(input: CreateProductInput): Promise<AdminProduct> {
    const token = await getAdminToken();

    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.message ?? "Failed to create product");
    }

    const result = await response.json();

    return mapApiAdminProduct(result.data as ApiProduct);
  },
};
