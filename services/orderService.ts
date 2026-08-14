import { supabase } from "@/lib/supabase/supabase";
import type {
  CreateOrderInput,
  CreateOrderResponse,
  Order,
  OrderStatus,
} from "@/types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL");
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json() as Promise<Order[]>;
  },

  async getOrderById(id: string): Promise<Order> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    return response.json() as Promise<Order>;
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    const result = await response.json();

    return result.data as Order;
  },
  async createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message ?? "Failed to create order");
    }

    return result.data as CreateOrderResponse;
  },
};
