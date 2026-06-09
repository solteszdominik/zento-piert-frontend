import Link from "next/link";

export default function ContactCta() {
  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] bg-blue-950 px-8 py-14 text-white md:px-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
                Kapcsolat
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Kérjen ajánlatot vagy tekintse meg a termékkínálatot.
              </h2>

              <p className="max-w-2xl leading-7 text-blue-100">
                A webshop később rendelésleadással és admin felülettel bővülhet,
                de az ajánlatkérés már az első verzióban is fontos CTA lehet.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 font-semibold text-blue-950 transition hover:bg-blue-100"
              >
                Ajánlatkérés
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Termékek
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
