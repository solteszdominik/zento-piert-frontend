import type { OrderFormData } from "@/types/order";

export type CheckoutFormErrors = Partial<Record<keyof OrderFormData, string>>;

export function validateCheckoutForm(
  formData: OrderFormData,
): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (!formData.customerName.trim()) {
    errors.customerName = "A név megadása kötelező.";
  }

  if (!formData.customerEmail.trim()) {
    errors.customerEmail = "Az e-mail cím megadása kötelező.";
  } else if (!isValidEmail(formData.customerEmail)) {
    errors.customerEmail = "Érvénytelen e-mail cím.";
  }

  if (!formData.customerPhone.trim()) {
    errors.customerPhone = "A telefonszám megadása kötelező.";
  } else if (!isValidPhone(formData.customerPhone)) {
    errors.customerPhone = "Érvénytelen telefonszám.";
  }

  if (!formData.customerAddress.trim()) {
    errors.customerAddress = "A szállítási cím megadása kötelező.";
  } else if (formData.customerAddress.trim().length < 5) {
    errors.customerAddress = "Adj meg egy érvényes szállítási címet.";
  }

  return errors;
}

export function hasCheckoutErrors(errors: CheckoutFormErrors) {
  return Object.keys(errors).length > 0;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string) {
  return /^[+0-9\s-]{6,20}$/.test(phone.trim());
}
