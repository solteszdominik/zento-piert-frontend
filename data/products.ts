import type { Product } from "@/types/product";

export const products: Product[] = [
  // napkins
  {
    id: "1",
    name: "Éttermi szalvéta",
    slug: "ettermi-szalveta",
    category: "napkins",
    description:
      "Klasszikus éttermi szalvéta vendéglátáshoz és háztartási használatra.",
    isFeatured: true,
    imageUrl: "/images/napkins/Szalvéta_Éttermi_600_l_(2).jpg",
  },
  {
    id: "2",
    name: "Harmónia szalvéta, 80 lapos",
    slug: "harmonia-szalveta",
    category: "napkins",
    description:
      "Klasszikus éttermi szalvéta vendéglátáshoz és háztartási használatra.",
    isFeatured: true,
    imageUrl: "/images/napkins/Szalvéta_Harmónia_fehér_80_db_-_os.jpg",
  },
  {
    id: "3",
    name: "Harmónia szalvéta, kockás, 80 lapos",
    slug: "harmonia-szalveta-kockas",
    category: "napkins",
    description:
      "Klasszikus éttermi szalvéta vendéglátáshoz és háztartási használatra.",
    isFeatured: true,
    imageUrl: "/images/napkins/Szalvéta_harmónia_kockás_80_db_-_os.jpg",
  },

  // tissues
  {
    id: "25",
    name: "Papírzsebkendő Harmónia",
    slug: "papirzsebkendo-harmonia",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 4 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_Harmónia_4_rétegű.jpg",
  },
  {
    id: "4",
    name: "Papírzsebkendő Lady",
    slug: "papirzsebkendo-lady",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_Lady_100_l(2019.).jpg",
  },
  {
    id: "20",
    name: "Papírzsebkendő Lady soft",
    slug: "papirzsebkendo-lady-soft",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_Lady_Soft_100_db-os.jpg",
  },
  {
    id: "9",
    name: "Papírzsebkendő PRIVÁT barack",
    slug: "papirzsebkendo-privat-barack",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_PRIVÁT_BARACK.jpg",
  },
  {
    id: "10",
    name: "Papírzsebkendő PRIVÁT jázmin-orgona",
    slug: "papirzsebkendo-privat-jazmin-orgona",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_PRIVÁT_JÁZMIN-ORGONA.jpg",
  },
  {
    id: "11",
    name: "Papírzsebkendő PRIVÁT bubble gum",
    slug: "papirzsebkendo-privat-bubble-gum",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_PRIVÁT_Bubble_Gum.jpg",
  },
  {
    id: "12",
    name: "Papírzsebkendő PRIVÁT aloe vera",
    slug: "papirzsebkendo-privat-aloe-vera",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_PRIVÁT_Aloe_Vera.jpg",
  },
  {
    id: "13",
    name: "Papírzsebkendő Pézsé",
    slug: "papirzsebkendo-pezse",
    category: "tissues",
    description: "100 lapos, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl:
      "/images/tissues/Papírzsebkendő_PÉZSÉ_3_rétegű_100_db-os_papírzsebkendő(2).jpg",
  },
  {
    id: "14",
    name: "Papírzsebkendő PRIVÁT",
    slug: "papirzsebkendo-privat-10-lapos",
    category: "tissues",
    description: "10 lapos visszazárható, 1. osztályú, 3 rétegű",
    isFeatured: true,
    imageUrl: "/images/tissues/Papírzsebkendő_10_l_NATUR_PRIVÁT_(2)_conv.jpg",
  },

  // foils

  {
    id: "6",
    name: "Alufólia, 20m",
    slug: "alufolia-20m",
    category: "aluminium-foil",
    description: "Ételek tárolásához, sütéshez és csomagoláshoz.",
    imageUrl: "/images/foils/Alufólia_20_fm_új_csom_2020..jpg",
  },
  {
    id: "30",
    name: "Alufólia, 30m",
    slug: "alufolia-30m",
    category: "aluminium-foil",
    description: "Ételek tárolásához, sütéshez és csomagoláshoz.",
    imageUrl: "/images/foils/Alufólia_30_fm_új_csom._2020.jpg",
  },

  // cling-film

  {
    id: "26",
    name: "Folpack, 20m",
    slug: "folpack-20m",
    category: "cling-film",
    description: "Ételek tárolásához és csomagoláshoz.",
    imageUrl: "/images/foils/Folpack_20_fm..jpg",
  },

  {
    id: "27",
    name: "Folpack, 30m",
    slug: "folpack-30m",
    category: "cling-film",
    description: "Ételek tárolásához és csomagoláshoz.",
    imageUrl: "/images/foils/Folpack_30_fm..jpg",
  },

  {
    id: "28",
    name: "Folpack, 50m",
    slug: "folpack-50m",
    category: "cling-film",
    description: "Ételek tárolásához és csomagoláshoz.",
    imageUrl: "/images/foils/Folpack_50_fm..jpg",
  },

  // baking-paper

  {
    id: "5",
    name: "Sütőpapír 8m, szilikonos",
    slug: "sutopapir-8m-silicone",
    category: "baking-paper",
    description: "Konyhai sütéshez használható, praktikus sütőpapír.",
    isFeatured: true,
    imageUrl: "/images/baking_paper/Sütőpapír__8_fm_szilikonos.jpg",
  },
  {
    id: "55",
    name: "Sütőpapír 8m, szilikonos, barna",
    slug: "sutopapir-8m-silicone-brown",
    category: "baking-paper",
    description: "Konyhai sütéshez használható, praktikus sütőpapír.",
    isFeatured: true,
    imageUrl: "/images/baking_paper/Sütőpapír_8_fm_szilikonos(BARNA)..jpg",
  },
  {
    id: "56",
    name: "Sütőpapír 15m",
    slug: "sutopapir-15m",
    category: "baking-paper",
    description: "Konyhai sütéshez használható, praktikus sütőpapír.",
    isFeatured: true,
    imageUrl: "/images/baking_paper/Sütőpapír_15_fm.jpg",
  },
  {
    id: "57",
    name: "Sütőpapír 15m, fehér",
    slug: "sutopapir-15m-white",
    category: "baking-paper",
    description: "Konyhai sütéshez használható, praktikus sütőpapír.",
    isFeatured: true,
    imageUrl: "/images/baking_paper/Sütőpapír_15_fm(FEHÉR).jpg",
  },

  // others
  {
    id: "7",
    name: "Papírzacskó",
    slug: "papirzacskok",
    category: "paper-bags",
    description: "Csomagoláshoz használható papírzacskók többféle méretben.",
    imageUrl: "/images/others/Papírzacskó_100_l_(1).jpg",
  },
  {
    id: "8",
    name: "Zsírpapír LADY, 5 íves",
    slug: "zsirpapir",
    category: "greaseproof-paper",
    description: "Élelmiszer-csomagoláshoz ideális papírtermék.",
    imageUrl: "/images/others/Háztartási_zsírpapír_5_íves_LADY.jpg",
  },
];
