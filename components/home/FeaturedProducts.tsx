import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Kiemelt kínálat
        </p>

        <h2 className="text-3xl font-bold text-blue-950">
          Legkeresettebb termékkategóriák
        </h2>

        <p className="mt-4 text-slate-600">
          A későbbi webshop működéshez előkészített termékkártyák, egyelőre
          statikus adatokkal.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredProducts.map((product) => (
          <article
            key={product.id}
            className="group rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
          >
            <div className="mb-5 aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 to-blue-200" />

            <h3 className="mb-2 text-xl font-bold text-blue-950">
              {product.name}
            </h3>

            <p className="text-sm leading-6 text-slate-600">
              {product.description}
            </p>

            <div className="mt-5 text-sm font-semibold text-blue-700">
              Részletek →
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
