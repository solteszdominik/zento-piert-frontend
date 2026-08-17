import type { ShippingMethod } from "@/config/shipping";

export interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  postalCode: string;
  city: string;
  streetAddress: string;

  companyName: string;
  message: string;

  shippingMethod: ShippingMethod;
  termsAccepted: boolean;
}

export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  unit: "db" | "csomag" | "lap";
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;

  customer_name: string;
  customer_email: string;
  customer_phone: string;

  postal_code: string;
  city: string;
  street_address: string;

  company_name: string | null;
  message: string | null;

  shipping_method: ShippingMethod;
  shipping_price: number;
  terms_accepted: boolean;

  total_price: number;
  status: OrderStatus;
  created_at: string;

  order_items: OrderItem[];
}

export interface CreateOrderItem {
  product_id: string;
  quantity: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;

  postal_code: string;
  city: string;
  street_address: string;

  company_name?: string;
  message?: string;

  shipping_method: ShippingMethod;
  terms_accepted: boolean;

  items: CreateOrderItem[];
}

export interface CreateOrderResponse {
  order: Order;
}
