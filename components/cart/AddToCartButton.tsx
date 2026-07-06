"use client";

import type { Product } from "@/types/product";
import { useCartStore } from "@/features/cart/cart.store";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="rounded-full border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-900 transition hover:border-blue-400 hover:bg-blue-50"
    >
      Kosárba rakom
    </button>
  );
}
