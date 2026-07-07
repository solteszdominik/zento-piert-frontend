"use client";

import { submitCheckoutRequest } from "@/lib/checkout";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/features/cart/cart.store";
import type {
  CheckoutFormData,
  CheckoutRequestPayload,
} from "@/types/checkout";

const initialFormData: CheckoutFormData = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  companyName: "",
  message: "",
};

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(
    null,
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      setFeedbackType("error");
      setFeedbackMessage("A kosár üres, így nem küldhető el ajánlatkérés.");
      return;
    }

    const payload: CheckoutRequestPayload = {
      ...formData,
      items,
      totalPrice,
    };

    try {
      setIsSubmitting(true);
      setFeedbackMessage(null);
      setFeedbackType(null);

      const response = await submitCheckoutRequest(payload);

      if (!response.success) {
        throw new Error(response.message);
      }

      setIsSubmitted(true);
      setFeedbackType("success");
      setFeedbackMessage(response.message);
      setFormData(initialFormData);
      clearCart();
    } catch (error) {
      setFeedbackType("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Nem sikerült elküldeni az ajánlatkérést.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Ajánlatkérés
        </p>

        <h1 className="text-4xl font-bold text-blue-950">
          Ajánlatkérés elküldése
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Add meg az elérhetőségeidet, mi pedig felvesszük veled a kapcsolatot.
        </p>

        {feedbackMessage && (
          <div
            className={`mt-8 rounded-2xl border p-5 font-semibold ${
              feedbackType === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        {items.length === 0 && !isSubmitted ? (
          <div className="mt-12 rounded-3xl border border-blue-100 bg-white p-10 text-center">
            <h2 className="text-2xl font-bold text-blue-950">A kosarad üres</h2>

            <p className="mt-3 text-slate-600">
              Ajánlatkérés előtt adj hozzá termékeket a kosárhoz.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Termékek megtekintése
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
            >
              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="font-semibold text-blue-950">Név *</span>
                  <input
                    required
                    value={formData.customerName}
                    onChange={(event) =>
                      handleChange("customerName", event.target.value)
                    }
                    className="rounded-2xl border border-blue-100 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-semibold text-blue-950">E-mail *</span>
                  <input
                    required
                    type="email"
                    value={formData.customerEmail}
                    onChange={(event) =>
                      handleChange("customerEmail", event.target.value)
                    }
                    className="rounded-2xl border border-blue-100 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-semibold text-blue-950">
                    Telefonszám *
                  </span>
                  <input
                    required
                    value={formData.customerPhone}
                    onChange={(event) =>
                      handleChange("customerPhone", event.target.value)
                    }
                    className="rounded-2xl border border-blue-100 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-semibold text-blue-950">Cégnév</span>
                  <input
                    value={formData.companyName}
                    onChange={(event) =>
                      handleChange("companyName", event.target.value)
                    }
                    className="rounded-2xl border border-blue-100 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-semibold text-blue-950">Üzenet</span>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(event) =>
                      handleChange("message", event.target.value)
                    }
                    className="resize-none rounded-2xl border border-blue-100 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isSubmitting ? "Küldés..." : "Ajánlatkérés elküldése"}
              </button>
            </form>

            <aside className="h-fit rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <h2 className="text-xl font-bold text-blue-950">
                Kosár tartalma
              </h2>

              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between gap-4 border-b border-blue-100 pb-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-blue-950">
                        {item.product.name}
                      </p>
                      <p className="text-slate-600">
                        {item.quantity} ×{" "}
                        {item.product.price.toLocaleString("hu-HU")} Ft
                      </p>
                    </div>

                    <strong className="text-blue-950">
                      {(item.product.price * item.quantity).toLocaleString(
                        "hu-HU",
                      )}{" "}
                      Ft
                    </strong>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between text-lg font-bold text-blue-950">
                <span>Összesen</span>
                <span>{totalPrice.toLocaleString("hu-HU")} Ft</span>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
