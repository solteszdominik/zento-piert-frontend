import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group rounded-3xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100">
      <div className="mb-5 aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 to-blue-200" />

      <h3 className="mb-2 text-lg font-bold text-blue-950">{product.name}</h3>

      <p className="mb-5 text-sm leading-6 text-slate-600">
        {product.description}
      </p>

      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
        >
          Részletek →
        </Link>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
          Elérhető
        </span>
      </div>
    </article>
  );
}
