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

  if (!formData.postalCode.trim()) {
    errors.postalCode = "Az irányítószám megadása kötelező.";
  } else if (!/^\d{4}$/.test(formData.postalCode.trim())) {
    errors.postalCode = "Az irányítószámnak 4 számjegyből kell állnia.";
  }

  if (!formData.city.trim()) {
    errors.city = "A város megadása kötelező.";
  }

  if (!formData.streetAddress.trim()) {
    errors.streetAddress = "Az utca és házszám megadása kötelező.";
  }

  if (!formData.shippingMethod) {
    errors.shippingMethod = "Válassz szállítási módot.";
  }

  if (!formData.termsAccepted) {
    errors.termsAccepted = "A rendeléshez el kell fogadnod a feltételeket.";
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
