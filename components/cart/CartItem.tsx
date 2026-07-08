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
    <article className="flex gap-4 rounded-3xl border border-blue-100 bg-white p-4 shadow-sm">
      <Link
        href={`/products/${item.product.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-50"
      >
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-contain p-2"
          sizes="96px"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-4">
          <div>
            <h2 className="font-bold text-blue-950">{item.product.name}</h2>

            <p className="mt-1 text-sm text-slate-500">
              {formatPrice(item.product.price)} / {item.product.unit}
            </p>
          </div>

          <p className="font-bold text-blue-950">{formatPrice(itemTotal)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.product.id)}
              className="h-8 w-8 rounded-full border border-blue-100 font-bold text-blue-900 hover:bg-blue-50"
            >
              -
            </button>

            <span className="min-w-6 text-center font-bold">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.product.id)}
              className="h-8 w-8 rounded-full border border-blue-100 font-bold text-blue-900 hover:bg-blue-50"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.product.id)}
            className="text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Törlés
          </button>
        </div>
      </div>
    </article>
  );
}
