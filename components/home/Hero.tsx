import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-sky-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Papírtermékek gyártása és forgalmazása
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-blue-950 md:text-6xl">
            Minőségi papírtermékek, átlátható kínálattal.
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-600">
            Céges és lakossági partnerek számára kínálunk papírárukat,
            csomagolóanyagokat és háztartási kiegészítőket modern, könnyen
            kezelhető webshop felületen.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Termékek megtekintése
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-900 transition hover:border-blue-400"
            >
              Kapcsolatfelvétel
            </Link>
          </div>
        </div>

        <div className="relative rounded-[2rem] bg-white p-4 shadow-xl shadow-blue-100">
          <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-blue-100 via-white to-blue-300" />

          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-blue-950 p-5 text-white shadow-lg">
            <p className="text-3xl font-bold">20+</p>
            <p className="text-sm text-blue-100">termékkategória</p>
          </div>
        </div>
      </div>
    </section>
  );
}
