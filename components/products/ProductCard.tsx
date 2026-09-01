import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { SHOP_ENABLED } from "@/config/shop";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100 sm:rounded-3xl sm:p-5">
      <Link
        href={`/products/${product.slug}`}
        className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-slate-50 sm:mb-5 sm:rounded-2xl"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain p-3 transition duration-300 group-hover:scale-105 sm:p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-bold text-blue-950 sm:text-lg">
          {product.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {product.description}
        </p>

        {product.packageSize && (
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Kiszerelés: {product.packageSize}
          </p>
        )}

        <p className="mt-2 text-lg font-bold text-blue-900">
          {formatPrice(product.price)} / {product.unit}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-5">
          {SHOP_ENABLED && <AddToCartButton product={product} />}

          <Link
            href={`/products/${product.slug}`}
            className="text-center text-sm font-semibold text-blue-700 transition hover:text-blue-900"
          >
            Részletek →
          </Link>
        </div>
      </div>
    </article>
  );
}
