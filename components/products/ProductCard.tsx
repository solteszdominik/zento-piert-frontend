import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100">
      <Link
        href={`/products/${product.slug}`}
        className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-bold text-blue-950">{product.name}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {product.description}
        </p>

        <p className="mt-4 text-lg font-bold text-blue-900">
          {formatPrice(product.price)}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-5">
          <AddToCartButton product={product} />

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
