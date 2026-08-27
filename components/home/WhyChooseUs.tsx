const items = [
  {
    title: "Több mint 30 év tapasztalat",
    text: "1991 óta foglalkozunk papírtermékek gyártásával és forgalmazásával, stabil szakmai háttérrel és folyamatos fejlődéssel.",
  },
  {
    title: "Saját gyártás, megbízható háttér",
    text: "Több mint 3000 m² üzem, korszerű géppark és saját raktár biztosítja a gyors és kiszámítható kiszolgálást.",
  },
  {
    title: "Országos partnerkapcsolatok",
    text: "Lakossági vásárlókat, viszonteladókat és céges partnereket egyaránt kiszolgálunk megbízható logisztikai háttérrel.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-blue-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-9 max-w-2xl sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-200 sm:text-sm">
            Miért válasszon minket?
          </p>

          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            Egyszerű, professzionális és hosszú távon bővíthető.
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl sm:p-6"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-blue-800 text-lg font-bold sm:mb-5 sm:size-12 sm:rounded-2xl sm:text-xl">
                ✓
              </div>

              <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-blue-100 sm:text-base">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
