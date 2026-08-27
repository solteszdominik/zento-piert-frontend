import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:py-20">
        <div className="rounded-[1.5rem] bg-blue-50 p-3 sm:rounded-[2rem] sm:p-6">
          <div className="aspect-[4/3] rounded-[1.25rem] bg-gradient-to-br from-blue-100 to-blue-300 sm:rounded-[1.5rem]" />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:text-sm">
            Rólunk
          </p>

          <h2 className="mb-5 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl md:text-4xl">
            Az abaújszántói Zentó – Piért Kft. nevében köszöntöm Önt! Az
            alábbiakban bemutatom társaságunkat.
          </h2>

          <p className="mb-5 text-sm leading-7 text-slate-600 sm:text-base">
            1991 – es megalakulásunk óta (Zentó Bt – Soltész Papír Kft) jelentős
            fejlődésen, átalakuláson vagyunk túl, a kezdeti 1 db papírzacskó
            gyártó gépet komoly géppark váltotta fel, jelenleg az alábbi
            gépekkel rendelkezünk:
          </p>

          <p className="mb-7 text-sm leading-7 text-slate-600 sm:mb-8 sm:text-base">
            Több mint 3000 m2 saját tulajdonú üzem, raktár, iroda biztosítja a
            zavartalan működést.
            <br />
            20 féle saját gyártású termékkel rendelkezünk, 20 fő munkatárssal
            látjuk el feladatainkat, ezen kívül 2 rehabilitációs céggel vagyunk
            kapcsolatban, ahol 20 -30 fő csökkent munkaképességű embernek
            folyamatosan csomagolási munkát biztosítunk.
            <br />
            Szállításainkat saját illetve bérelt teherautókkal, kamionokkal
            látjuk el.
          </p>

          <Link
            href="/about"
            className="inline-flex rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-900 transition hover:border-blue-400 sm:px-6 sm:py-3 sm:text-base"
          >
            Tudj meg többet
          </Link>
        </div>
      </div>
    </section>
  );
}
