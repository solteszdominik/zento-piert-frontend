import { supabase } from "@/lib/supabase/supabase";

const BUCKET_NAME = "product-images";
const PRODUCT_FOLDER = "products";

export interface ProductStorageImage {
  name: string;
  path: string;
  publicUrl: string;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
}

export const productImageService = {
  async uploadImage(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) {
      throw new Error("Csak képfájl tölthető fel.");
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      throw new Error("A kép mérete maximum 5 MB lehet.");
    }

    const safeFileName = sanitizeFileName(file.name);
    const uniqueFileName = `${crypto.randomUUID()}-${safeFileName}`;
    const filePath = `${PRODUCT_FOLDER}/${uniqueFileName}`;

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

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    return data.publicUrl;
  },

  async getImages(): Promise<ProductStorageImage[]> {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(PRODUCT_FOLDER, {
        limit: 500,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (error) {
      throw new Error(`Nem sikerült betölteni a képeket: ${error.message}`);
    }

    return (data ?? [])
      .filter((item) => item.id)
      .map((item) => {
        const path = `${PRODUCT_FOLDER}/${item.name}`;

        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(path);

        return {
          name: item.name,
          path,
          publicUrl: publicUrlData.publicUrl,
        };
      });
  },
};
