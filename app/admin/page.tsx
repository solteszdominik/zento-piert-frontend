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
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Zentó-Piért Admin</h1>

          <p className="mt-1 text-sm text-gray-500">Adminisztrációs felület</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Kijelentkezés
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          type="button"
          onClick={() => router.push("/admin/orders")}
          className="rounded-xl border p-6 text-left transition hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">Rendelések</h2>

          <p className="mt-2 text-sm text-gray-500">
            Rendelések megtekintése és kezelése.
          </p>
        </button>
      </div>
    </main>
  );
}
