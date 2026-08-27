"use client";

import { useCartStore } from "@/features/cart/cart.store";
import { getCartTotalPrice, getCartTotalQuantity } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import Button from "../ui/Button";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalQuantity = getCartTotalQuantity(items);
  const totalPrice = getCartTotalPrice(items);

  return (
    <aside className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:rounded-3xl sm:p-6 lg:sticky lg:top-24 lg:self-start">
      <h2 className="text-xl font-bold text-blue-950">Kosár összesítő</h2>

      <div className="mt-6 space-y-3 text-sm text-slate-700">
        <div className="flex justify-between">
          <span>Termékfajták</span>
          <strong>{items.length} db</strong>
        </div>

        <div className="flex justify-between">
          <span>Összes mennyiség</span>
          <strong>{totalQuantity} db</strong>
        </div>

        <div className="flex justify-between border-t border-blue-200 pt-3 text-base">
          <span>Végösszeg</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
      </div>

      <Button href="/checkout" fullWidth className="mt-6">
        Rendelés folytatása
      </Button>

      <Button
        type="button"
        onClick={clearCart}
        variant="secondary"
        fullWidth
        className="mt-3"
      >
        Kosár ürítése
      </Button>
    </aside>
  );
}
