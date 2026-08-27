import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductFilters from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";
import { productService } from "@/services/productService";

interface ProductsPageProps {
  searchParams?: Promise<{
    category?: string;
    brand?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = await productService.getProducts();
  const params = await searchParams;
  const selectedCategory = params?.category;
  const selectedBrand = params?.brand?.toLowerCase();
  const search = params?.search?.toLowerCase() ?? "";

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesBrand = selectedBrand
      ? product.brand?.toLowerCase() === selectedBrand
      : true;

    const matchesSearch = search
      ? product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      : true;

    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <>
      <Header />

      <main>
        <section className="bg-gradient-to-br from-blue-50 via-white to-sky-100">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Termékek
            </p>

            <h1 className="mb-5 max-w-3xl text-4xl font-bold tracking-tight text-blue-950 md:text-5xl">
              Átlátható papírtermék kínálat egy helyen.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Böngéssz kategóriák szerint, vagy keress konkrét terméknévre.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <ProductFilters />

          <div className="mb-8">
            <p className="text-sm text-slate-500">
              Találatok száma:{" "}
              <span className="font-semibold text-blue-950">
                {filteredProducts.length}
              </span>
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-10 text-center">
              <h2 className="text-xl font-bold text-blue-950">Nincs találat</h2>
              <p className="mt-2 text-slate-600">
                Próbálj másik kategóriát vagy keresési kifejezést.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
