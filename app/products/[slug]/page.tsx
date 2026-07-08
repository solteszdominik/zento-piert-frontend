import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((item) => item.id === product.category);

  return (
    <>
      <Header />

      <main>
        <section className="bg-gradient-to-br from-blue-50 via-white to-sky-100">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
            <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-blue-100">
              <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-blue-200" />
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

              <p className="mb-8 text-lg leading-8 text-slate-600">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
                >
                  Rendelés leadása
                </Link>

                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-100 bg-white p-6">
              <h2 className="mb-2 text-lg font-bold text-blue-950">
                Felhasználás
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Háztartási, kereskedelmi és vendéglátói felhasználásra is
                alkalmas termék.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-6">
              <h2 className="mb-2 text-lg font-bold text-blue-950">
                Kiszerelés
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                A pontos kiszerelés és ár később termékadatként kerülhet
                feltöltésre.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-6">
              <h2 className="mb-2 text-lg font-bold text-blue-950">Rendelés</h2>
              <p className="text-sm leading-6 text-slate-600">
                A rendelésleadás később kosárral, checkouttal és admin
                rendelések kezeléssel bővíthető.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
