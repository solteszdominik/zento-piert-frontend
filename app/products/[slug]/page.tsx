import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { categories } from "@/data/categories";
import { productService } from "@/services/productService";
import { SHOP_ENABLED } from "@/config/shop";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  let product;

  try {
    product = await productService.getProductBySlug(slug);
  } catch {
    notFound();
  }

  const category = categories.find((item) => item.id === product.category);

  return (
    <>
      <main>
        <section className="bg-gradient-to-br from-blue-50 via-white to-sky-100">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
            <div className="rounded-[1.5rem] bg-white p-3 shadow-xl shadow-blue-100 sm:rounded-[2rem] sm:p-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-slate-50 sm:rounded-[1.5rem]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-4 sm:p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div>
              <Link
                href="/products"
                className="mb-5 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-900 sm:mb-6"
              >
                ← Vissza a termékekhez
              </Link>

              {category && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:text-sm">
                  {category.name}
                </p>
              )}

              <h1 className="mb-4 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl md:mb-5 md:text-5xl">
                {product.name}
              </h1>

              <p className="mb-5 text-base leading-7 text-slate-600 sm:mb-6 sm:text-lg sm:leading-8">
                {product.description}
              </p>

              {(product.brand ||
                product.productLine ||
                product.packageSize) && (
                <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
                  {product.brand && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 sm:text-sm">
                      Márka: {product.brand}
                    </span>
                  )}

                  {product.productLine && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 sm:text-sm">
                      Termékcsalád: {product.productLine}
                    </span>
                  )}

                  {product.packageSize && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 sm:text-sm">
                      Kiszerelés: {product.packageSize}
                    </span>
                  )}
                </div>
              )}

              <div className="mb-5 sm:mb-6">
                <p className="text-xl font-bold text-blue-950 sm:text-2xl">
                  {product.price.toLocaleString("hu-HU")} Ft / {product.unit}
                </p>

                {product.packageSize && (
                  <p className="mt-1 text-sm text-slate-500">
                    Kiszerelés: {product.packageSize}
                  </p>
                )}
              </div>

              <div>
                {SHOP_ENABLED && (
                  <div className="w-full sm:w-auto">
                    <AddToCartButton product={product} />
                  </div>
                )}

                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    SHOP_ENABLED ? "mt-3" : ""
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      product.isAvailable ? "bg-green-500" : "bg-slate-400"
                    }`}
                  />

                  <span
                    className={
                      product.isAvailable ? "text-green-700" : "text-slate-500"
                    }
                  >
                    {SHOP_ENABLED
                      ? product.isAvailable
                        ? "A termék jelenleg rendelhető"
                        : "A termék jelenleg nem rendelhető"
                      : product.isAvailable
                        ? "A termék jelenleg elérhető"
                        : "A termék jelenleg nem elérhető"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
