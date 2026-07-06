"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/features/cart/cart.store";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="grid gap-5 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm md:grid-cols-[140px_1fr_auto] md:items-center">
      <Link
        href={`/products/${item.product.slug}`}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50"
      >
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-contain p-3"
          sizes="140px"
        />
        <p className="mt-2 font-semibold text-blue-900">
          {item.product.price.toLocaleString("hu-HU")} Ft / db
        </p>
      </Link>

      <div>
        <h2 className="text-lg font-bold text-blue-950">{item.product.name}</h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {item.product.description}
        </p>

        <button
          type="button"
          onClick={() => removeItem(item.product.id)}
          className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700"
        >
          Eltávolítás
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => decreaseQuantity(item.product.id)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 text-blue-900 hover:bg-blue-50"
        >
          -
        </button>

        <span className="min-w-8 text-center font-bold text-blue-950">
          {item.quantity}
          <p className="text-sm font-semibold text-blue-950">
            {(item.product.price * item.quantity).toLocaleString("hu-HU")} Ft
          </p>
        </span>

        <button
          type="button"
          onClick={() => increaseQuantity(item.product.id)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 text-blue-900 hover:bg-blue-50"
        >
          +
        </button>
      </div>
    </article>
  );
}
