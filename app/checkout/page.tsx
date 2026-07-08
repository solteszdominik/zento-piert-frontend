"use client";

import { createOrder } from "@/services/order.service";
import type { CreateOrderPayload, OrderFormData } from "@/types/order";
import { FormEvent, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/features/cart/cart.store";
import { useToastStore } from "@/features/toast/toast.store";
import { getCartTotalPrice } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import {
  hasCheckoutErrors,
  validateCheckoutForm,
  type CheckoutFormErrors,
} from "@/lib/validation/order";

const initialFormData: OrderFormData = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  companyName: "",
  message: "",
};

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const showToast = useToastStore((state) => state.showToast);

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(
    null,
  );

  const totalPrice = getCartTotalPrice(items);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateCheckoutForm(formData);

    if (hasCheckoutErrors(validationErrors)) {
      setErrors(validationErrors);

      showToast({
        title: "Hiányzó vagy hibás adatok",
        message: "Kérlek ellenőrizd a megadott adatokat.",
        variant: "error",
      });

      return;
    }

    if (items.length === 0) {
      setFeedbackType("error");
      setFeedbackMessage("A kosár üres, így nem küldhető el ajánlatkérés.");
      return;
    }

    const payload: CreateOrderPayload = {
      ...formData,
      items,
      totalPrice,
    };

    try {
      setIsSubmitting(true);
      setFeedbackMessage(null);
      setFeedbackType(null);

      const response = await createOrder(payload);

      if (!response.success) {
        throw new Error(response.message);
      }

      setIsSubmitted(true);
      setFeedbackType("success");
      setFeedbackMessage(response.message);
      showToast({
        title: "Sikeres rendelés",
        message: response.message,
        variant: "success",
      });

      setErrors({});
      setFormData(initialFormData);
      clearCart();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nem sikerült elküldeni a rendelést.";

      setFeedbackType("error");
      setFeedbackMessage(message);

      showToast({
        title: "Hiba történt",
        message,
        variant: "error",
      });
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

            <Button href="/products" className="mt-6">
              Termékek megtekintése
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
            >
              <div className="grid gap-5">
                <Field label="Név" required error={errors.customerName}>
                  <Input
                    required
                    hasError={Boolean(errors.customerName)}
                    value={formData.customerName}
                    onChange={(event) =>
                      handleChange("customerName", event.target.value)
                    }
                  />
                </Field>

                <Field label="E-mail" required error={errors.customerEmail}>
                  <Input
                    required
                    type="email"
                    hasError={Boolean(errors.customerEmail)}
                    value={formData.customerEmail}
                    onChange={(event) =>
                      handleChange("customerEmail", event.target.value)
                    }
                  />
                </Field>

                <Field
                  label="Telefonszám"
                  required
                  error={errors.customerPhone}
                >
                  <Input
                    required
                    hasError={Boolean(errors.customerPhone)}
                    value={formData.customerPhone}
                    onChange={(event) =>
                      handleChange("customerPhone", event.target.value)
                    }
                  />
                </Field>

                <Field label="Cégnév">
                  <Input
                    value={formData.companyName}
                    onChange={(event) =>
                      handleChange("companyName", event.target.value)
                    }
                  />
                </Field>

                <Field label="Üzenet">
                  <Textarea
                    rows={5}
                    value={formData.message}
                    onChange={(event) =>
                      handleChange("message", event.target.value)
                    }
                  />
                </Field>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                className="mt-6"
              >
                {isSubmitting ? "Küldés..." : "Ajánlatkérés elküldése"}
              </Button>
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
                        {item.quantity} × {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <strong className="text-blue-950">
                      {formatPrice(item.product.price * item.quantity)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between text-lg font-bold text-blue-950">
                <span>Összesen</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
