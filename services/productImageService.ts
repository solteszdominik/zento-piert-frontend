import { supabase } from "@/lib/supabase/supabase";

const BUCKET_NAME = "product-images";

export const PRODUCT_IMAGE_FOLDERS = [
  {
    value: "1-foliak",
    label: "Fóliák",
  },
  {
    value: "2-szalveta",
    label: "Szalvéták",
  },
  {
    value: "3-zsebkendok",
    label: "Zsebkendők",
  },
  {
    value: "4-suto-papir",
    label: "Sütőpapír",
  },
  {
    value: "5-sano",
    label: "Sano",
  },
  {
    value: "6-egyebek",
    label: "Egyebek",
  },
] as const;

export type ProductImageFolder =
  (typeof PRODUCT_IMAGE_FOLDERS)[number]["value"];

export interface ProductStorageImage {
  name: string;
  path: string;
  publicUrl: string;
  folder: ProductImageFolder;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
}

function getPublicUrl(path: string) {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

  return data.publicUrl;
}

async function getImagesFromFolder(
  folder: ProductImageFolder,
  currentPath: string = folder,
): Promise<ProductStorageImage[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(currentPath, {
      limit: 1000,
      sortBy: {
        column: "name",
        order: "asc",
      },
    });

  if (error) {
    throw new Error(
      `Nem sikerült betölteni a(z) ${folder} mappa tartalmát: ${error.message}`,
    );
  }

  const images: ProductStorageImage[] = [];

  for (const item of data ?? []) {
    if (item.name === ".emptyFolderPlaceholder" || item.name.startsWith(".")) {
      continue;
    }

    const itemPath = `${currentPath}/${item.name}`;

    if (!item.id) {
      const nestedImages = await getImagesFromFolder(folder, itemPath);

      images.push(...nestedImages);
      continue;
    }

    const lowerCaseName = item.name.toLowerCase();

    const isImage =
      lowerCaseName.endsWith(".jpg") ||
      lowerCaseName.endsWith(".jpeg") ||
      lowerCaseName.endsWith(".png") ||
      lowerCaseName.endsWith(".webp");

    if (!isImage) {
      continue;
    }

    images.push({
      name: item.name,
      path: itemPath,
      publicUrl: getPublicUrl(itemPath),
      folder,
    });
  }

  return images;
}

export const productImageService = {
  async uploadImage(
    file: File,
    folder: ProductImageFolder = "6-egyebek",
  ): Promise<string> {
    if (!file.type.startsWith("image/")) {
      throw new Error("Csak képfájl tölthető fel.");
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      throw new Error("A kép mérete maximum 5 MB lehet.");
    }

    const safeFileName = sanitizeFileName(file.name);

    if (!safeFileName) {
      throw new Error("A fájlnév nem megfelelő.");
    }

    const uniqueFileName = `${crypto.randomUUID()}-${safeFileName}`;
    const filePath = `${folder}/${uniqueFileName}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw new Error(`Nem sikerült feltölteni a képet: ${error.message}`);
    }

    return getPublicUrl(filePath);
  },

  async getImages(): Promise<ProductStorageImage[]> {
    const allImages = await Promise.all(
      PRODUCT_IMAGE_FOLDERS.map((folder) => getImagesFromFolder(folder.value)),
    );

    return allImages.flat();
  },

  async getImagesByFolder(
    folder: ProductImageFolder,
  ): Promise<ProductStorageImage[]> {
    return getImagesFromFolder(folder);
  },
};
