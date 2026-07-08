import type { CartItem } from "@/types/cart";

export interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string;
  message: string;
}

export interface CreateOrderPayload extends OrderFormData {
  items: CartItem[];
  totalPrice: number;
}

export interface OrderResponse {
  success: boolean;
  message: string;
}
