"use client";

import { createOrder } from "@/services/order.service";
import type { CreateOrderPayload, OrderFormData } from "@/types/order";
import { FormEvent, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/features/cart/cart.store";
import { useToastStore } from "@/features/toast/toast.store";
import { getCartTotalPrice } from "@/lib/cart";
import Button from "@/components/ui/Button";
import {
  hasCheckoutErrors,
  validateCheckoutForm,
  type CheckoutFormErrors,
} from "@/lib/validation/order";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import CheckoutForm from "@/components/order/OrderForm";
import OrderSummary from "@/components/order/OrderSummary";

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
      setFeedbackMessage("A kosár üres, így nem küldhető el rendelés.");
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
        <PageHeader
          badge="Rendelés"
          title="Rendelés leadása"
          description="Add meg az elérhetőségeidet, és ellenőrizd a kosár tartalmát."
        />

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
          <EmptyState
            title="A kosarad üres"
            description="Rendelés leadása előtt adj hozzá termékeket a kosárhoz."
            action={<Button href="/products">Termékek megtekintése</Button>}
          />
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
            <CheckoutForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />

            <OrderSummary items={items} totalPrice={totalPrice} />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
