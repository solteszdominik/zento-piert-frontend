"use client";

import Link from "next/link";
import { useCartStore } from "@/features/cart/cart.store";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <aside className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
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
          <strong>{totalPrice.toLocaleString("hu-HU")} Ft</strong>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block rounded-full bg-blue-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
      >
        Ajánlatkérés folytatása
      </Link>

      <button
        type="button"
        onClick={clearCart}
        className="mt-3 w-full rounded-full border border-blue-200 bg-white px-5 py-3 font-semibold text-blue-900 transition hover:border-blue-400"
      >
        Kosár ürítése
      </button>
    </aside>
  );
}
