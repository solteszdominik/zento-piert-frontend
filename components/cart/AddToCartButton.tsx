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
    addItem(product);

    showToast({
      title: "Kosár frissítve",
      message: `${product.name} a kosárba került.`,
      variant: "success",
    });
  };
  if (!product.isAvailable) {
    return (
      <Button type="button" disabled fullWidth size="sm">
        Nem elérhető
      </Button>
    );
  }
  return (
    <Button type="button" onClick={handleAddToCart} fullWidth size="sm">
      Kosárba
    </Button>
  );
}
