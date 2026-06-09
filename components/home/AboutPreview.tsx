import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="rounded-[2rem] bg-blue-50 p-6">
          <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-blue-100 to-blue-300" />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Rólunk
          </p>

          <h2 className="mb-5 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Megbízható papírtermék-beszállító cégeknek és lakossági vásárlóknak.
          </h2>

          <p className="mb-6 leading-7 text-slate-600">
            Termékkínálatunkat úgy alakítottuk ki, hogy a mindennapi háztartási,
            vendéglátói és kereskedelmi felhasználásra is egyszerű, átlátható
            megoldást nyújtson.
          </p>

          <p className="mb-8 leading-7 text-slate-600">
            A cél egy könnyen kezelhető, modern webshop, ahol a termékek gyorsan
            áttekinthetők, később pedig rendelhetők és admin felületen
            kezelhetők.
          </p>

          <Link
            href="/about"
            className="inline-flex rounded-full border border-blue-200 px-6 py-3 font-semibold text-blue-900 transition hover:border-blue-400"
          >
            Tudj meg többet
          </Link>
        </div>
      </div>
    </section>
  );
}
