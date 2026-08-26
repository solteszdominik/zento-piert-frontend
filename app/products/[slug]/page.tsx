import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { categories } from "@/data/categories";
import { productService } from "@/services/productService";

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
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
            <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-blue-100">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-50">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div>
              <Link
                href="/products"
                className="mb-6 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-900"
              >
                ← Vissza a termékekhez
              </Link>

              {category && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
                  {category.name}
                </p>
              )}

              <h1 className="mb-5 text-4xl font-bold tracking-tight text-blue-950 md:text-5xl">
                {product.name}
              </h1>

              <p className="mb-6 text-lg leading-8 text-slate-600">
                {product.description}
              </p>

              {(product.brand ||
                product.productLine ||
                product.packageSize) && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {product.brand && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
                      Márka: {product.brand}
                    </span>
                  )}

                  {product.productLine && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
                      Termékcsalád: {product.productLine}
                    </span>
                  )}

                  {product.packageSize && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
                      Kiszerelés: {product.packageSize}
                    </span>
                  )}
                </div>
              )}

              <div className="mb-6">
                <p className="text-2xl font-bold text-blue-950">
                  {product.price.toLocaleString("hu-HU")} Ft / {product.unit}
                </p>

                {product.packageSize && (
                  <p className="mt-1 text-sm text-slate-500">
                    Kiszerelés: {product.packageSize}
                  </p>
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-4">
                  <AddToCartButton product={product} />
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      product.isAvailable ? "bg-green-500" : "bg-slate-400"
                    }`}
                  />

                  <span
                    className={
                      product.isAvailable ? "text-green-700" : "text-slate-500"
                    }
                  >
                    {product.isAvailable
                      ? "A termék jelenleg rendelhető"
                      : "A termék jelenleg nem rendelhető"}
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
