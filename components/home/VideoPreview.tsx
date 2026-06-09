export default function VideoPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="rounded-[2rem] bg-blue-50 p-4 shadow-sm">
          <div className="flex aspect-video items-center justify-center rounded-[1.5rem] bg-blue-950 text-white">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white/10 text-2xl">
                ▶
              </div>
              <p className="font-semibold">Videó helye</p>
              <p className="mt-1 text-sm text-blue-100">
                Később ide kerülhetnek a bemutató videók.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Bemutató videók
          </p>

          <h2 className="mb-5 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Videós tartalmakhoz előkészített szekció.
          </h2>

          <p className="leading-7 text-slate-600">
            A később kapott videók itt jelenhetnek meg: termékbemutató, gyártási
            folyamat, raktár, csomagolás vagy céges bemutatkozó formában.
          </p>
        </div>
      </div>
    </section>
  );
}
