import Link from "next/link";

export default function ContactCta() {
  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <div className="rounded-[1.5rem] bg-blue-950 px-5 py-10 text-white sm:rounded-[2rem] sm:px-8 sm:py-12 md:px-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-200 sm:text-sm">
                Kapcsolat
              </p>

              <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                Kérdése van termékeinkkel vagy rendelésével kapcsolatban?
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Vegye fel velünk a kapcsolatot, munkatársaink készséggel
                segítenek termékeinkkel, rendelésekkel és partneri
                együttműködéssel kapcsolatos kérdésekben.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:flex-col lg:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-center font-semibold text-blue-950 transition hover:bg-blue-100"
              >
                Kapcsolatfelvétel
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
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
