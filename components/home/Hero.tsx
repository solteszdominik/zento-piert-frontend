import Button from "../ui/Button";

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
            <Button href="/products">Termékek megtekintése</Button>

            <Button href="/contact" variant="secondary">
              Kapcsolatfelvétel
            </Button>
          </div>
        </div>

        <div className="relative rounded-[2rem] bg-white p-4 shadow-xl shadow-blue-100">
          <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-blue-100 via-white to-blue-300" />

          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-blue-950 p-5 text-white shadow-lg">
            <p className="text-3xl font-bold">7</p>
            <p className="text-sm text-blue-100">termékkategória</p>
          </div>
        </div>
      </div>
    </section>
  );
}
