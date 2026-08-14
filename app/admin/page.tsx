"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";
import { orderService } from "@/services/orderService";
import type { Order, OrderStatus } from "@/types/order";

const statusLabels: Record<OrderStatus, string> = {
  new: "Új",
  processing: "Feldolgozás alatt",
  completed: "Teljesítve",
  cancelled: "Törölve",
};

const statusClasses: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    const loadAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch {
        setError("Nem sikerült betölteni a rendeléseket.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAdmin();
  }, [router]);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        order.order_number?.toLowerCase().includes(normalizedSearch) ||
        order.customer_name.toLowerCase().includes(normalizedSearch) ||
        order.customer_email.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  if (isLoading) {
    return <main className="p-8">Betöltés...</main>;
  }

  return (
    <main className="p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Zentó-Piért Admin</h1>

          <p className="mt-1 text-sm text-gray-500">Rendelések kezelése</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-fit rounded-md border px-4 py-2 text-sm transition hover:bg-gray-50"
        >
          Kijelentkezés
        </button>
      </div>

      {error && <p className="mb-6 text-red-600">{error}</p>}

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Keresés rendelésre, névre vagy e-mailre..."
          className="w-full rounded-md border px-3 py-2 md:max-w-md"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as OrderStatus | "all")
          }
          className="rounded-md border px-3 py-2"
        >
          <option value="all">Minden státusz</option>

          <option value="new">Új</option>

          <option value="processing">Feldolgozás alatt</option>

          <option value="completed">Teljesítve</option>

          <option value="cancelled">Törölve</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p>Nincs a feltételeknek megfelelő rendelés.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3">Rendelésszám</th>

                <th className="px-4 py-3">Vásárló</th>

                <th className="px-4 py-3">E-mail</th>

                <th className="px-4 py-3">Státusz</th>

                <th className="px-4 py-3">Dátum</th>

                <th className="px-4 py-3">Tételek</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                  className="cursor-pointer border-b transition hover:bg-gray-50 last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">
                    {order.order_number || "—"}
                  </td>

                  <td className="px-4 py-3">{order.customer_name}</td>

                  <td className="px-4 py-3">{order.customer_email}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[order.status]}`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(order.created_at).toLocaleString("hu-HU")}
                  </td>

                  <td className="px-4 py-3">
                    {order.order_items.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}{" "}
                    db
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
