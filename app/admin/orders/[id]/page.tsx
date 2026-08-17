"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/supabase";
import { orderService } from "@/services/orderService";
import { shippingMethods } from "@/config/shipping";

import type { Order, OrderStatus } from "@/types/order";

const statusLabels: Record<OrderStatus, string> = {
  new: "Új",
  processing: "Feldolgozás alatt",
  completed: "Teljesítve",
  cancelled: "Törölve",
};

export default function AdminOrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>("new");

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingStatus, setIsSavingStatus] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      try {
        const data = await orderService.getOrderById(params.id);

        setOrder(data);
        setStatus(data.status);
      } catch {
        setError("Nem sikerült betölteni a rendelést.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [params.id, router]);

  const handleStatusChange = async () => {
    if (!order) {
      return;
    }

    try {
      setIsSavingStatus(true);
      setError(null);

      await orderService.updateOrderStatus(order.id, status);

      const refreshedOrder = await orderService.getOrderById(order.id);

      setOrder(refreshedOrder);
      setStatus(refreshedOrder.status);
    } catch {
      setError("Nem sikerült módosítani a rendelés státuszát.");
    } finally {
      setIsSavingStatus(false);
    }
  };

  if (isLoading) {
    return <main className="p-8">Betöltés...</main>;
  }

  if (error && !order) {
    return (
      <main className="p-8">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="p-8">
        <p>A rendelés nem található.</p>
      </main>
    );
  }

  const shippingMethod = shippingMethods[order.shipping_method];

  return (
    <main className="mx-auto max-w-5xl p-8">
      <button
        type="button"
        onClick={() => router.push("/admin/orders")}
        className="mb-6 text-sm underline"
      >
        ← Vissza a rendelésekhez
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{order.order_number}</h1>

        <p className="mt-1 text-sm text-gray-500">
          {new Date(order.created_at).toLocaleString("hu-HU")}
        </p>
      </div>

      {error && <p className="mb-6 text-red-600">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">Vásárló</h2>

          <div className="space-y-2">
            <p>
              <strong>Név:</strong> {order.customer_name}
            </p>

            <p>
              <strong>E-mail:</strong> {order.customer_email}
            </p>

            <p>
              <strong>Telefon:</strong> {order.customer_phone}
            </p>

            <p>
              <strong>Cím:</strong> {order.postal_code} {order.city},{" "}
              {order.street_address}
            </p>

            {order.company_name && (
              <p>
                <strong>Cégnév:</strong> {order.company_name}
              </p>
            )}
          </div>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">Rendelés</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="status" className="mb-2 block font-semibold">
                Státusz
              </label>

              <div className="flex flex-wrap gap-3">
                <select
                  id="status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as OrderStatus)
                  }
                  className="rounded-md border px-3 py-2"
                >
                  <option value="new">Új</option>

                  <option value="processing">Feldolgozás alatt</option>

                  <option value="completed">Teljesítve</option>

                  <option value="cancelled">Törölve</option>
                </select>

                <button
                  type="button"
                  onClick={handleStatusChange}
                  disabled={isSavingStatus || status === order.status}
                  className="rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSavingStatus ? "Mentés..." : "Mentés"}
                </button>
              </div>
            </div>

            <p>
              <strong>Aktuális státusz:</strong> {statusLabels[order.status]}
            </p>

            <p>
              <strong>Szállítási mód:</strong>{" "}
              {shippingMethod?.label ?? order.shipping_method}
            </p>

            <p>
              <strong>Szállítási díj:</strong>{" "}
              {order.shipping_price === 0
                ? "Díjmentes"
                : `${order.shipping_price.toLocaleString("hu-HU")} Ft`}
            </p>

            <p>
              <strong>Rendelés összege:</strong>{" "}
              {order.total_price.toLocaleString("hu-HU")} Ft
            </p>

            <p>
              <strong>Feltételek elfogadva:</strong>{" "}
              {order.terms_accepted ? "Igen" : "Nem"}
            </p>

            <p>
              <strong>Megjegyzés:</strong> {order.message || "Nincs megjegyzés"}
            </p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">Termékek</h2>

        {order.order_items.length === 0 ? (
          <p className="text-gray-500">
            Ehhez a rendeléshez nincs termék rögzítve.
          </p>
        ) : (
          <div className="divide-y">
            {order.order_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div>
                  <p className="font-medium">{item.product_name}</p>

                  <p className="text-sm text-gray-500">
                    {item.unit_price.toLocaleString("hu-HU")} Ft / {item.unit}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    {item.quantity} {item.unit}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(item.unit_price * item.quantity).toLocaleString("hu-HU")}{" "}
                    Ft
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
