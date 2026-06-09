const items = [
  {
    title: "Átlátható kínálat",
    text: "Kategóriákba rendezett termékek, egyszerű böngészés és későbbi webshop működésre előkészített felület.",
  },
  {
    title: "Céges szemlélet",
    text: "A megjelenés nem csak lakossági vásárlóknak, hanem viszonteladóknak és partnereknek is bizalomépítő.",
  },
  {
    title: "Bővíthető rendszer",
    text: "Később kosár, rendeléskezelés, admin, videók és termékfeltöltés is ráépíthető.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-blue-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
            Miért válasszon minket?
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Egyszerű, professzionális és hosszú távon bővíthető.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-blue-800 text-xl font-bold">
                ✓
              </div>

              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>

              <p className="leading-7 text-blue-100">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
