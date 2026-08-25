export type ProductCategory =
  | "napkins"
  | "tissues"
  | "baking-paper"
  | "aluminium-foil"
  | "paper-bags"
  | "greaseproof-paper"
  | "cling-film"
  | "laundry-care"
  | "dishwashing"
  | "surface-cleaners"
  | "toilet-cleaners";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  price: number;
  imageUrl: string;
  isFeatured?: boolean;
  isAvailable?: boolean;
  unit: "db" | "csomag" | "lap";
  packageSize?: string;
  brand?: string;
  productLine?: string;
}

export interface AdminProduct extends Product {
  categoryId: string;
}
