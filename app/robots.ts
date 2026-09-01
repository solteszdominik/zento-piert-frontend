import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://zento-piert.hu";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/cart", "/checkout"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
