import { tenders } from "@/data/tenders";
import Image from "next/image";

export default function TendersSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Pályázatok
          </p>

          <h2 className="text-3xl font-bold text-blue-950 md:text-4xl">
            Megnyert pályázataink
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tenders.map((tender) => (
            <article
              key={tender.id}
              className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {tender.logo ? (
                <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl bg-slate-50">
                  <Image
                    src={tender.logo}
                    alt={`${tender.company} pályázat`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : null}

              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {tender.company}
              </p>

              <h3 className="mb-5 text-xl font-bold leading-snug text-blue-950">
                {tender.title}
              </h3>

              <div className="mb-5 rounded-2xl bg-blue-50 p-4">
                <p className="text-sm text-slate-600">
                  Visszatérítendő hitel összege:
                </p>
                <p className="text-2xl font-bold text-blue-700">
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
  );
}
