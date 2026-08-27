import Image from "next/image";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { tenders } from "@/data/tenders";

export default function Page() {
  return (
    <>
      <Header />

      <main>
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="mb-8 text-center sm:mb-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:text-sm">
                Pályázatok
              </p>

              <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl">
                Megnyert pályázataink
              </h1>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {tenders.map((tender) => (
                <article
                  key={tender.id}
                  className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6"
                >
                  {tender.logo && (
                    <div className="relative mb-5 h-48 w-full overflow-hidden rounded-xl bg-slate-50 sm:mb-6 sm:h-64 sm:rounded-2xl">
                      <Image
                        src={tender.logo}
                        alt={`${tender.company} pályázat`}
                        fill
                        className="object-contain p-3 sm:p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
                    {tender.company}
                  </p>

                  <h2 className="mb-5 text-lg font-bold leading-snug text-blue-950 sm:text-xl">
                    {tender.title}
                  </h2>

                  <div className="mb-5 rounded-xl bg-blue-50 p-4 sm:rounded-2xl">
                    <p className="text-sm text-slate-600">
                      Visszatérítendő hitel összege:
                    </p>

                    <p className="mt-1 text-xl font-bold text-blue-700 sm:text-2xl">
                      {tender.amount}
                    </p>
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    {tender.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
