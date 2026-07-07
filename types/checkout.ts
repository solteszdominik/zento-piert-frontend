import type { CartItem } from "@/types/cart";

export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string;
  message: string;
}

export interface CheckoutRequestPayload extends CheckoutFormData {
  items: CartItem[];
  totalPrice: number;
}
