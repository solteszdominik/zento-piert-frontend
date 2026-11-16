import Image from "next/image";
import Link from "next/link";

interface ShowcaseItem {
  title: string;
  description: string;
  image: string;
  category: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Saját gyártású papírzacskók",
    description:
      "Praktikus papírzacskók különböző méretekben, kereskedelmi, vendéglátóipari és mindennapi felhasználásra.",
    image: "/showcase/bags_feature.png",
    category: "paper-bags",
  },
  {
    title: "Sütőpapírok és zsírpapírok",
    description:
      "Megbízható papírtermékek sütéshez, élelmiszerek előkészítéséhez és csomagolásához.",
    image: "/showcase/baking_feature.png",
    category: "baking-paper",
  },
  {
    title: "Alufóliák",
    description:
      "Különböző méretű és kiszerelésű alufóliák háztartási és professzionális felhasználásra.",
    image: "/showcase/foil_feature.jpeg",
    category: "aluminium-foil",
  },
  {
    title: "Éttermi és háztartási szalvéták",
    description:
      "Szalvéták a vendéglátás és a mindennapi használat igényeihez, többféle kiszerelésben.",
    image: "/showcase/napkin_feature.png",
    category: "napkins",
  },
  {
    title: "Papírzsebkendők",
    description:
      "Praktikus, többféle kiszerelésben elérhető papírzsebkendők a mindennapi használathoz.",
    image: "/showcase/tissue_feature.jpeg",
    category: "tissues",
  },
];

export default function Showcase() {
  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Saját gyártású termékeink
            </p>

            <h2 className="text-3xl font-bold text-blue-950 md:text-4xl">
              Minőség és megbízhatóság a mindennapokban
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Ismerd meg saját gyártású papírtermékeinket és
              csomagolóanyagainkat, amelyek praktikus megoldást kínálnak
              háztartási és üzleti felhasználásra.
            </p>
          </div>

          <Link
            href="/products"
            className="w-fit rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Összes termék megtekintése →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcaseItems.map((item) => (
            <Link
              key={item.category}
              href={`/products?category=${item.category}`}
              className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-6 transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="border-t border-blue-50 p-6">
                <h3 className="text-xl font-bold text-blue-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-blue-700">
                  Termékek megtekintése →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
