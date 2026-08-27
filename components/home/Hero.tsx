import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-sky-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 md:grid-cols-2 md:items-center md:gap-12 md:py-24">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:mb-4 sm:text-sm">
            Papírtermékek gyártása és forgalmazása
          </p>

          <h1 className="mb-5 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl md:mb-6 md:text-6xl">
            Papírtermékek gyártása és forgalmazása több mint 30 év
            tapasztalatával.
          </h1>

          <p className="mb-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 md:mb-8">
            A Zentó–Piért Kft. saját gyártású és gondosan válogatott
            papírtermékekkel, csomagolóanyagokkal és háztartási kiegészítőkkel
            szolgálja ki partnereit országszerte.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/products">Termékek megtekintése</Button>

            <Button href="/contact" variant="secondary">
              Kapcsolatfelvétel
            </Button>
          </div>
        </div>

        <div className="relative pb-5 sm:pb-0">
          <div className="rounded-[1.5rem] bg-white p-3 shadow-xl shadow-blue-100 sm:rounded-[2rem] sm:p-4">
            <div className="aspect-[4/3] rounded-[1.25rem] bg-gradient-to-br from-blue-100 via-white to-blue-300 sm:rounded-[1.5rem]" />
          </div>

          <div className="absolute bottom-0 left-3 rounded-2xl bg-blue-950 px-4 py-3 text-white shadow-lg sm:-bottom-6 sm:-left-6 sm:p-5">
            <p className="text-2xl font-bold sm:text-3xl">7</p>

            <p className="text-xs text-blue-100 sm:text-sm">termékkategória</p>
          </div>
        </div>
      </div>
    </section>
  );
}
