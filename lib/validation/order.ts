import type { OrderFormData } from "@/types/order";

export type CheckoutFormErrors = Partial<Record<keyof OrderFormData, string>>;

export function validateCheckoutForm(
  formData: OrderFormData,
): CheckoutFormErrors {
  const Error: CheckoutFormErrors = {};

  if (!formData.customerName.trim()) {
    Error.customerName = "A név megadása kötelező.";
  }

  if (!formData.customerEmail.trim()) {
    Error.customerEmail = "Az e-mail cím megadása kötelező.";
  } else if (!isValidEmail(formData.customerEmail)) {
    Error.customerEmail = "Érvénytelen e-mail cím.";
  }

  if (!formData.customerPhone.trim()) {
    Error.customerPhone = "A telefonszám megadása kötelező.";
  } else if (!isValidPhone(formData.customerPhone)) {
    Error.customerPhone = "Érvénytelen telefonszám.";
  }

  return Error;
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
