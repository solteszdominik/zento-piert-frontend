import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const contactItems = [
  {
    label: "Cím",
    value: "3881 Abaújszántó, Béke út 18.",
  },
  {
    label: "Telefon",
    value: "+36 20 403 2414",
  },
  {
    label: "E-mail",
    value: "info@zento-piért.hu",
  },
];

export default function Page() {
  return (
    <>
      <Header />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-20">
        <section className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Kapcsolat
          </p>

          <h1 className="text-3xl font-bold text-blue-950 md:text-5xl">
            Lépjen kapcsolatba velünk
          </h1>

          <p className="mt-5 leading-7 text-slate-600">
            Kérdés, ajánlatkérés vagy együttműködés esetén írjon nekünk
            üzenetet, vagy keressen minket közvetlenül az alábbi
            elérhetőségeken.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-blue-950">
              Üzenetküldés
            </h2>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Név
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                  placeholder="Az Ön neve"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  E-mail cím
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Üzenet
                </label>
                <textarea
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                  placeholder="Írja meg üzenetét..."
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Üzenet küldése
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-blue-950">
                Elérhetőségek
              </h2>

              <div className="space-y-4">
                {contactItems.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                      {item.label}
                    </p>
                    <p className="mt-1 text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <iframe
                title="Zentó-Piért Kft. térkép"
                src="https://www.google.com/maps?q=3881%20Aba%C3%BAjsz%C3%A1nt%C3%B3%2C%20B%C3%A9ke%20%C3%BAt%2018&output=embed"
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
