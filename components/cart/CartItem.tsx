"use client";

import Image from "next/image";
import Link from "next/link";

import type { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/features/cart/cart.store";
import { getCartItemTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const itemTotal = getCartItemTotal(item);

  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-3xl">
      <div className="flex gap-3 sm:gap-4">
        <Link
          href={`/products/${item.product.slug}`}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:h-24 sm:w-24 sm:rounded-2xl"
        >
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 80px, 96px"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <Link
                href={`/products/${item.product.slug}`}
                className="font-bold text-blue-950 transition hover:text-blue-700"
              >
                {item.product.name}
              </Link>

              <p className="mt-1 text-sm text-slate-500">
                {formatPrice(item.product.price)} / {item.product.unit}
              </p>

              {item.product.packageSize && (
                <p className="mt-1 text-xs text-slate-500">
                  Kiszerelés: {item.product.packageSize}
                </p>
              )}
            </div>

            <p className="shrink-0 font-bold text-blue-950">
              {formatPrice(itemTotal)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-blue-50 pt-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.product.id)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 font-bold text-blue-900 transition hover:bg-blue-50"
            aria-label={`${item.product.name} mennyiségének csökkentése`}
          >
            −
          </button>

          <span className="min-w-7 text-center font-bold text-blue-950">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(item.product.id)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 font-bold text-blue-900 transition hover:bg-blue-50"
            aria-label={`${item.product.name} mennyiségének növelése`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeItem(item.product.id)}
          className="text-sm font-semibold text-red-600 transition hover:text-red-700"
        >
          Törlés
        </button>
      </div>
    </article>
  );
}
