"use client";

import type { Product } from "@/types/product";
import { useCartStore } from "@/features/cart/cart.store";
import { useToastStore } from "@/features/toast/toast.store";
import Button from "../ui/Button";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const handleAddToCart = () => {
    if (!product.isAvailable) {
      showToast({
        title: "Nem elérhető",
        message: `${product.name} jelenleg nem rendelhető.`,
        variant: "error",
      });

      return;
    }

    addItem(product);

    showToast({
      title: "Kosár frissítve",
      message: `${product.name} a kosárba került.`,
      variant: "success",
    });
  };

  if (!product.isAvailable) {
    return (
      <Button type="button" disabled>
        Nem elérhető
      </Button>
    );
  }

  return (
    <Button type="button" onClick={handleAddToCart}>
      Kosárba
    </Button>
  );
}
