"use client";

import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCartStore } from "@/features/cart/cart.store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <>
      <Header />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Kosár
        </p>

        <h1 className="text-4xl font-bold text-blue-950">Ajánlatkérő kosár</h1>

        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Gyűjtsd össze a termékeket, ellenőrizd a mennyiségeket, majd küldd el
          ajánlatkérésként.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-blue-100 bg-white p-10 text-center">
            <h2 className="text-2xl font-bold text-blue-950">
              A kosarad még üres
            </h2>

            <p className="mt-3 text-slate-600">
              Nézz körül a termékek között, és adj hozzá pár terméket.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Termékek megtekintése
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <CartSummary />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
