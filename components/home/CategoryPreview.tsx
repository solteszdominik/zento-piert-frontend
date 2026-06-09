import { categories } from "@/data/categories";
import Link from "next/link";

export default function CategoryPreview() {
  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Termékkategóriák
            </p>

            <h2 className="text-3xl font-bold text-blue-950 md:text-4xl">
              Gyors áttekintés a kínálatról
            </h2>

            <p className="mt-4 text-slate-600">
              A főbb kategóriák külön szekcióban jelennek meg, hogy a vásárló
              gyorsan megtalálja, amit keres.
            </p>
          </div>

          <Link
            href="/products"
            className="w-fit rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Összes termék
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-800 transition group-hover:bg-blue-700 group-hover:text-white">
                {category.name.charAt(0)}
              </div>

              <h3 className="mb-2 text-lg font-bold text-blue-950">
                {category.name}
              </h3>

              <p className="text-sm leading-6 text-slate-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
