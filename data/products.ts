import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Papírszalvéta",
    slug: "papirszalveta",
    category: "napkins",
    description:
      "Klasszikus papírszalvéta vendéglátáshoz és háztartási használatra.",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Papírzsebkendő",
    slug: "papirzsebkendo",
    category: "tissues",
    description: "Puha, praktikus kiszerelésű papírzsebkendő.",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Sütőpapír",
    slug: "sutopapir",
    category: "baking-paper",
    description: "Konyhai sütéshez használható, praktikus sütőpapír.",
    isFeatured: true,
  },
  {
    id: "4",
    name: "Alufólia",
    slug: "alufolia",
    category: "aluminium-foil",
    description: "Ételek tárolásához, sütéshez és csomagoláshoz.",
  },
  {
    id: "5",
    name: "Papírzacskó",
    slug: "papirzacskok",
    category: "paper-bags",
    description: "Csomagoláshoz használható papírzacskók többféle méretben.",
  },
  {
    id: "6",
    name: "Zsírpapír",
    slug: "zsirpapir",
    category: "greaseproof-paper",
    description: "Élelmiszer-csomagoláshoz ideális papírtermék.",
  },
];
