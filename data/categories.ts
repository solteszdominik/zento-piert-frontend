// src/data/categories.ts

import type { ProductCategory } from "@/types/product";

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "napkins",
    name: "Szalvéták",
    description: "Különböző méretű és kiszerelésű papírszalvéták.",
  },
  {
    id: "tissues",
    name: "Papírzsebkendők",
    description: "Háztartási és vendéglátói felhasználásra.",
  },
  {
    id: "baking-paper",
    name: "Sütőpapírok",
    description: "Praktikus megoldások sütéshez és konyhai használathoz.",
  },
  {
    id: "aluminium-foil",
    name: "Alufóliák",
    description: "Többféle méretben és kiszerelésben.",
  },
  {
    id: "paper-bags",
    name: "Papírzacskók",
    description: "Csomagoláshoz, üzleti és háztartási felhasználásra.",
  },
  {
    id: "greaseproof-paper",
    name: "Zsírpapírok",
    description: "Élelmiszer-csomagoláshoz és konyhai célokra.",
  },
  {
    id: "cling-film",
    name: "Folpack",
    description: "Frissen tartáshoz és csomagoláshoz.",
  },
];
