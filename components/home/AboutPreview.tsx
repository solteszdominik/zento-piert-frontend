import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="rounded-[2rem] bg-blue-50 p-6">
          <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-blue-100 to-blue-300" />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Rólunk
          </p>

          <h2 className="mb-5 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Az abaújszántói Zentó – Piért Kft. nevében köszöntöm Önt! Az
            alábbiakban bemutatom társaságunkat.
          </h2>

          <p className="mb-6 leading-7 text-slate-600">
            1991 – es megalakulásunk óta (Zentó Bt – Soltész Papír Kft) jelentős
            fejlődésen, átalakuláson vagyunk túl, a kezdeti 1 db papírzacskó
            gyártó gépet komoly géppark váltotta fel, jelenleg az alábbi
            gépekkel rendelkezünk:
          </p>

          <p className="mb-8 leading-7 text-slate-600">
            Több mint 3000 m2 saját tulajdonú üzem, raktár, iroda biztosítja a
            zavartalan működést. <br />
            20 féle saját gyártású termékkel rendelkezünk, 20 fő munkatárssal
            látjuk el feladatainkat, ezen kívül 2 rehabilitációs céggel vagyunk
            kapcsolatban, ahol 20 -30 fő csökkent munkaképességű embernek
            folyamatosan csomagolási munkát biztosítunk. <br />
            Szállításainkat saját illetve bérelt teherautókkal, kamionokkal
            látjuk el.
          </p>

          <Link
            href="/about"
            className="inline-flex rounded-full border border-blue-200 px-6 py-3 font-semibold text-blue-900 transition hover:border-blue-400"
          >
            Tudj meg többet
          </Link>
        </div>
      </div>
    </section>
  );
}
