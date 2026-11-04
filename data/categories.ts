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
  {
    id: "other",
    name: "Egyéb",
    description: "Egyéb termékek.",
  },
  {
    id: "wrapper",
    name: "Csomagolóanyagok",
    description: "Különböző típusú csomagolóanyagok.",
  },
  {
    id: "horeca",
    name: "HORECA",
    description: "Horeca ipari termékek.",
  },
  {
    id: "laundry-care",
    name: "Mosás és öblítés",
    description: "Mosószerek, öblítők és ruhápolási termékek.",
  },
  {
    id: "dishwashing",
    name: "Mosogatás",
    description: "Kézi és gépi mosogatáshoz készült termékek.",
  },
  {
    id: "surface-cleaners",
    name: "Felülettisztítás",
    description: "Tisztítószerek különböző háztartási felületekhez.",
  },
  {
    id: "toilet-cleaners",
    name: "WC-tisztítás",
    description: "WC-tisztító és higiéniai termékek.",
  },
];
