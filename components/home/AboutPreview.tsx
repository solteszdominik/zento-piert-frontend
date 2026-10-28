import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:py-20">
        <div className="rounded-[1.5rem] bg-blue-50 p-3 sm:rounded-[2rem] sm:p-6">
          <Image
            src="/images/zento-bolt-iroda.png"
            alt="A Zento-Piért Kft. abaújszántói üzlete"
            width={1536}
            height={1024}
            priority
            className="h-auto w-full rounded-[1.25rem] object-cover sm:rounded-[1.5rem]"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:text-sm">
            Rólunk
          </p>

          <h2 className="mb-5 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl md:text-4xl">
            Szeretettel köszöntöm Önt az abaújszántói Zento–Piért Kft. oldalán!
            Engedje meg, hogy röviden bemutassam vállalkozásunkat.
          </h2>

          <p className="mb-5 text-sm leading-7 text-slate-600 sm:text-base">
            Történetünk 1991-ben indult (Zento Bt.–Soltész Papír Kft. néven),
            egyetlen papírzacskógyártó géppel. Az elmúlt évtizedek folyamatos
            fejlesztéseinek köszönhetően mára egy modern, komoly kapacitású
            gépparkkal büszkélkedhetünk, amellyel stabilan és magas minőségben
            szolgáljuk ki a piacot.
          </p>

          <p className="mb-7 text-sm leading-7 text-slate-600 sm:mb-8 sm:text-base">
            <b>Biztos háttér:</b> Egy több mint 3000 m²-es, saját tulajdonú
            üzem, raktár és iroda biztosítja a gördülékeny és zavartalan
            gyártást.
            <br />
            <b>Széles választék:</b> 20-féle saját gyártású termékkel állunk
            partnereink rendelkezésére.
            <br />
            <b>Profi csapat és felelősségvállalás:</b> 20 fő saját
            munkavállalónk mellett két rehabilitációs céggel is együttműködünk,
            így folyamatos munkát biztosítunk 20-30 fő megváltozott
            munkaképességű embernek.
            <br />
            <b>Rugalmas logisztika:</b> A rendeléseket saját és bérelt
            teherautóinkkal, kamionjainkkal pontosan és biztonságosan
            szállítjuk.
          </p>

          <Link
            href="/about"
            className="inline-flex rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-900 transition hover:border-blue-400 sm:px-6 sm:py-3 sm:text-base"
          >
            Tudjon meg többet
          </Link>
        </div>
      </div>
    </section>
  );
}
