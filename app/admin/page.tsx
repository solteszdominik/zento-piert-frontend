"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Zentó-Piért Admin</h1>

          <p className="mt-1 text-sm text-gray-500">Adminisztrációs felület</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-md border px-4 py-2 text-sm transition hover:bg-gray-50 sm:w-auto"
        >
          Kijelentkezés
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          type="button"
          onClick={() => router.push("/admin/orders")}
          className="rounded-xl border p-5 text-left transition hover:bg-gray-50 sm:p-6"
        >
          <h2 className="text-xl font-semibold">Rendelések</h2>

          <p className="mt-2 text-sm text-gray-500">
            Rendelések megtekintése és kezelése.
          </p>
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-xl border p-5 text-left transition hover:bg-gray-50 sm:p-6"
        >
          <h2 className="text-xl font-semibold">Termékek</h2>

          <p className="mt-2 text-sm text-gray-500">
            Termékek, árak és elérhetőség kezelése.
          </p>
        </button>
      </div>
    </main>
  );
}
