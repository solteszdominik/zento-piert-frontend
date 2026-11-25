import { supabase } from "@/lib/supabase/supabase";

const BUCKET_NAME = "product-images";

// A bejövő képek lehetnek nagyok, a Storage-ba viszont csak tömörítve kerülnek.
const MAX_ORIGINAL_SIZE = 20 * 1024 * 1024;
const MAX_OPTIMIZED_SIZE = 1.5 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1920;
const WEBP_QUALITIES = [0.8, 0.7, 0.6, 0.5] as const;
const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const PRODUCT_IMAGE_FOLDERS = [
  { value: "1-foliak", label: "Fóliák" },
  { value: "2-szalveta", label: "Szalvéták" },
  { value: "3-zsebkendok", label: "Zsebkendők" },
  { value: "4-suto-papir", label: "Sütőpapír" },
  { value: "5-sano", label: "Sano" },
  { value: "6-egyebek", label: "Egyebek" },
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

async function convertToWebp(file: File): Promise<File> {
  if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Csak JPG, PNG és WebP formátumú kép tölthető fel.");
  }

  if (file.size > MAX_ORIGINAL_SIZE) {
    throw new Error("Az eredeti kép mérete maximum 20 MB lehet.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error(
      "A képet nem sikerült megnyitni. Próbáld JPG-ként menteni.",
    );
  }

  try {
    const scale = Math.min(
      1,
      MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("A böngésző nem tudja feldolgozni a képet.");
    }

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    let optimized: Blob | null = null;
    for (const quality of WEBP_QUALITIES) {
      const result = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Nem sikerült tömöríteni a képet."));
          },
          "image/webp",
          quality,
        );
      });

      if (result.type !== "image/webp") {
        throw new Error("Ez a böngésző nem támogatja a WebP-képek készítését.");
      }

      optimized = result;
      if (result.size <= MAX_OPTIMIZED_SIZE) break;
    }

    if (!optimized || optimized.size > MAX_OPTIMIZED_SIZE) {
      throw new Error(
        "A kép még optimalizálva is túl nagy. Próbálj kisebb képet.",
      );
    }

    const originalBaseName = file.name.replace(/\.[^.]+$/, "");
    const safeBaseName = sanitizeFileName(originalBaseName) || "termekkep";

    return new File([optimized], `${safeBaseName}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } finally {
    bitmap.close();
  }
}

async function getImagesFromFolder(
  folder: ProductImageFolder,
  currentPath: string = folder,
): Promise<ProductStorageImage[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(currentPath, {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
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
    const isImage = [".jpg", ".jpeg", ".png", ".webp"].some((extension) =>
      lowerCaseName.endsWith(extension),
    );

    if (!isImage) continue;

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
    const optimizedFile = await convertToWebp(file);
    const uniqueFileName = `${crypto.randomUUID()}-${optimizedFile.name}`;
    const filePath = `${folder}/${uniqueFileName}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, optimizedFile, {
        // Minden új feltöltés egyedi URL-t kap, ezért biztonságos a hosszú cache.
        cacheControl: "31536000",
        upsert: false,
        contentType: "image/webp",
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
