"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import CartSummary from "@/components/cart/CartSummary";
import { useCartStore } from "@/features/cart/cart.store";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import CartList from "@/components/cart/CartList";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <>
      <Header />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-6 py-16">
        <PageHeader
          badge="Kosár"
          title="Kosár"
          description="Gyűjtsd össze a termékeket, ellenőrizd a mennyiségeket, majd add le a rendelést."
        />

        {items.length === 0 ? (
          <EmptyState
            title="A kosarad még üres"
            description="Nézz körül a termékek között, és adj hozzá pár terméket."
            action={<Button href="/products">Termékek megtekintése</Button>}
          />
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
            <CartList items={items} />

            <CartSummary />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
