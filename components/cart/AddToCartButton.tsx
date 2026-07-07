"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/features/cart/cart.store";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setShowMessage(true);

    window.setTimeout(() => {
      setShowMessage(false);
    }, 1800);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
      >
        Kosárba
      </button>

      {showMessage && (
        <div className="absolute left-1/2 top-full z-20 mt-3 w-max -translate-x-1/2 rounded-full bg-blue-950 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          Termék a kosárba került
        </div>
      )}
    </div>
  );
}
