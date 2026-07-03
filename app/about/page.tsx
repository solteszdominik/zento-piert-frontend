import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const machines = [
  "2 db automata papírzsebkendő gép",
  "2 db automata papírzacskógép",
  "1 db automata kéztörlő gép",
  "2 db automata szalvéta gép nyomdával",
  "1 db új nagy teljesítményű alufólia kicsévélő gépsor csomagolóval",
  "1 db automata alufólia–folpack gyártó gép",
  "1 db automata sütőpapírgyártó gép",
  "1 db automata csomagológép tekercses termékek csomagolására",
  "2 db félautomata folpack gyártó gép",
  "3 db Mitsubishi targonca",
  "1 db ívre vágó gép",
  "1 db síkvágó gép",
];

const capacities = [
  { product: "Papír zsebkendő 100", capacity: "1.200.000 csg." },
  { product: "Papír zsebkendő 10", capacity: "1.000.000 csg." },
  { product: "Folpack", capacity: "150.000 tek." },
  { product: "Alufólia 10 fm-re átszámolva", capacity: "200.000 tek." },
  { product: "Szalvéta 28×28, 32×32", capacity: "100.000 csg." },
  { product: "Befőzési gumigyűrű, celofán", capacity: "korlátlan" },
  { product: "Sütőpapír 8, 15, 20 fm", capacity: "260.000 tek." },
  { product: "Grillzacskó", capacity: "100.000 csg." },
  { product: "Lady 5 íves zsírpapír", capacity: "200.000 csg." },
  { product: "Papírzacskók", capacity: "4.000.000 db" },
];

const suppliers = [
  "Drenik Kft. papírgyára (Szolnok)",
  "Gran Papír Kft.",
  "ERFO Kft. Mohács",
  "Huchtemeier Papier (DE)",
  "Harmaneci papírgyár (SK)",
  "Convertis SRO (SK)",
  "Symetal (GR)",
  "Vajda Papír Kft.",
  "Alt és Társa Bt.",
  "Rollbox Trade Kft.",
  "Sydnex Kft.",
  "Pátria Nyomda Zrt.",
];

const customers = [
  "Kerekes Kft. – PRIVÁT Üzletlánc",
  "REÁL Hungária Kft.",
  "KeletAlfi Ker. Kft.",
  "Szolnok Coop Zrt.",
  "Mecsek Füszért Zrt.",
  "Észak–Kelet Pro Coop Zrt.",
  "Enger Kft.",
  "Abaúj Coop Zrt. (Encs)",
  "Pille Kft.",
  "PDP Trade '99 Kft.",
  "Zöld Plasztik Lakics Kft.",
  "Eurogastro Kereskedelmi Zrt.",
  "AD VESZ Kft. (Miskolc)",
];

export default function Page() {
  return (
    <>
      <Header />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-20">
        <section className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Bemutatkozás
          </p>

          <h1 className="text-3xl font-bold text-blue-950 md:text-5xl">
            Az abaújszántói Zentó–Piért Kft.
          </h1>

          <div className="mt-8 space-y-5 leading-7 text-slate-600">
            <p>
              Az abaújszántói Zentó–Piért Kft. nevében köszöntöm Önt! Az
              alábbiakban bemutatom társaságunkat.
            </p>

            <p>
              Székhelyünk és telephelyünk:{" "}
              <strong className="text-slate-800">
                3881 Abaújszántó, Béke út 18.
              </strong>
            </p>

            <p>
              1991-es megalakulásunk óta jelentős fejlődésen és átalakuláson
              mentünk keresztül. A kezdeti 1 db papírzacskó gyártó gépet mára
              komoly géppark váltotta fel.
            </p>
          </div>
        </section>

        <section className="mt-12 max-w-5xl">
          <h2 className="text-2xl font-bold text-blue-950">Gépparkunk</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {machines.map((machine) => (
              <div
                key={machine}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 shadow-sm"
              >
                {machine}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-4xl">
          <div className="space-y-5 leading-7 text-slate-600">
            <p>
              Több mint 3000 m² saját tulajdonú üzem, raktár és iroda biztosítja
              a zavartalan működést.
            </p>

            <p>
              20 féle saját gyártású termékkel rendelkezünk, 20 fő munkatárssal
              látjuk el feladatainkat. Ezen kívül 2 rehabilitációs céggel
              vagyunk kapcsolatban, ahol 20–30 fő csökkent munkaképességű
              embernek biztosítunk folyamatos csomagolási munkát.
            </p>

            <p>
              Szállításainkat saját, illetve bérelt teherautókkal és kamionokkal
              látjuk el.
            </p>
          </div>
        </section>

        <section className="mt-12 max-w-5xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-950">
              Főbb termékek havi kapacitása
            </h2>
            <p className="mt-1 text-sm text-slate-500">2 műszakban</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[2fr_1fr] bg-slate-50 font-semibold text-slate-800">
              <div className="px-5 py-4">Termék</div>
              <div className="px-5 py-4">Kapacitás</div>
            </div>

            {capacities.map((item) => (
              <div
                key={item.product}
                className="grid grid-cols-[2fr_1fr] border-t border-slate-200 text-slate-700"
              >
                <div className="px-5 py-4">{item.product}</div>
                <div className="px-5 py-4 font-medium">{item.capacity}</div>
              </div>
            ))}
          </div>
          <section className="mt-16 max-w-5xl">
            <h2 className="text-2xl font-bold text-blue-950">
              Minőségirányítás
            </h2>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="leading-7 text-slate-700">
                2001 óta <strong>ISO 9001:2008</strong> minőségirányítási
                tanúsítvánnyal rendelkezünk, amelyet minden évben sikeres audit
                keretében megújítunk.
              </p>
            </div>
          </section>
          <section className="mt-16 max-w-6xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-blue-950">
                Referenciáink
              </h2>

              <p className="mt-2 text-slate-600">
                Legfontosabb üzleti partnereink
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-xl font-semibold text-blue-900">
                  Legnagyobb szállítóink
                </h3>

                <ul className="space-y-2 text-slate-700">
                  {suppliers.map((supplier) => (
                    <li key={supplier}>• {supplier}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-xl font-semibold text-blue-900">
                  Legnagyobb vevőink
                </h3>

                <ul className="space-y-2 text-slate-700">
                  {customers.map((customer) => (
                    <li key={customer}>• {customer}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
