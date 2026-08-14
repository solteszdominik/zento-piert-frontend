export interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  companyName: string;
  message: string;
}

export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  message: string | null;
  status: OrderStatus;
  created_at: string;
  order_items: OrderItem[];
  total_price: number;
}

export interface CreateOrderItem {
  product_id: string;
  quantity: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  message?: string;
  company_name?: string;
  items: CreateOrderItem[];
}

export interface CreateOrderResponse {
  order: Order;
}
