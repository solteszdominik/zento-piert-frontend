"use client";

import { useState } from "react";
import type { FormEventHandler } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import CheckoutForm from "@/components/order/OrderForm";
import OrderSummary from "@/components/order/OrderSummary";

import { SHOP_ENABLED } from "@/config/shop";
import { useCartStore } from "@/features/cart/cart.store";
import { useToastStore } from "@/features/toast/toast.store";
import { getCartTotalPrice } from "@/lib/cart";
import {
  hasCheckoutErrors,
  validateCheckoutForm,
  type CheckoutFormErrors,
} from "@/lib/validation/order";
import { createOrder } from "@/services/order.service";
import type { CreateOrderInput, OrderFormData } from "@/types/order";

const initialFormData: OrderFormData = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  postalCode: "",
  city: "",
  streetAddress: "",
  companyName: "",
  message: "",
  shippingMethod: "standard",
  termsAccepted: false,
};

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const showToast = useToastStore((state) => state.showToast);

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(
    null,
  );

  const productsTotal = getCartTotalPrice(items);

  const handleChange = (
    field: keyof OrderFormData,
    value: string | boolean,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
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

    const payload: CreateOrderInput = {
      customer_name: formData.customerName.trim(),
      customer_email: formData.customerEmail.trim(),
      customer_phone: formData.customerPhone.trim(),

      postal_code: formData.postalCode.trim(),
      city: formData.city.trim(),
      street_address: formData.streetAddress.trim(),

      company_name: formData.companyName.trim() || undefined,
      message: formData.message.trim() || undefined,

      shipping_method: formData.shippingMethod,
      terms_accepted: formData.termsAccepted,

      items: items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      setIsSubmitting(true);
      setFeedbackMessage(null);
      setFeedbackType(null);

      const response = await createOrder(payload);

      const successMessage =
        `A rendelést sikeresen rögzítettük. ` +
        `Rendelésszám: ${response.order.order_number}`;

      setIsSubmitted(true);
      setFeedbackType("success");
      setFeedbackMessage(successMessage);

      showToast({
        title: "Sikeres rendelés",
        message: successMessage,
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

  if (!SHOP_ENABLED) {
    return (
      <>
        <Header />

        <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <EmptyState
            title="Az online rendelés még nem elérhető"
            description="A webshop rendelési funkciója hamarosan indul. Addig is böngészheted termékeinket."
            action={<Button href="/products">Termékek megtekintése</Button>}
          />
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <PageHeader
          badge="Rendelés"
          title="Rendelés leadása"
          description="Add meg az elérhetőségeidet, és ellenőrizd a kosár tartalmát."
        />

        {!isSubmitted && items.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <Button href="/cart">← Kosár szerkesztése</Button>
          </div>
        )}

        {feedbackMessage && (
          <div
            className={`mt-6 rounded-2xl border p-4 text-sm font-semibold sm:mt-8 sm:p-5 sm:text-base ${
              feedbackType === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        {isSubmitted ? (
          <div className="mt-8">
            <Button href="/products">Tovább a termékekhez</Button>
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="A kosarad üres"
            description="Rendelés leadása előtt adj hozzá termékeket a kosárhoz."
            action={<Button href="/products">Termékek megtekintése</Button>}
          />
        ) : (
          <div className="mt-8 grid gap-6 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            <CheckoutForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />

            <OrderSummary
              items={items}
              productsTotal={productsTotal}
              shippingMethod={formData.shippingMethod}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
