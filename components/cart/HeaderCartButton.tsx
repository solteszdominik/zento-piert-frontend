"use client";

import Link from "next/link";
import { useCartStore } from "@/features/cart/cart.store";
import { getCartTotalQuantity } from "@/lib/cart";
import { ShoppingCart } from "lucide-react";

export default function HeaderCartButton() {
  const items = useCartStore((state) => state.items);

  const totalQuantity = getCartTotalQuantity(items);

  return (
    <Link
      href="/cart"
      aria-label="Kosár"
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white transition hover:bg-blue-800"
    >
      <ShoppingCart size={20} strokeWidth={2.2} />

      {totalQuantity > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
