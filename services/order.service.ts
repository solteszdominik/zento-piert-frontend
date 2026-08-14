import type { CreateOrderInput, CreateOrderResponse } from "@/types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL");
}

export async function createOrder(
  payload: CreateOrderInput,
): Promise<CreateOrderResponse> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Nem sikerült elküldeni a rendelést.");
  }

  return data.data as CreateOrderResponse;
}
