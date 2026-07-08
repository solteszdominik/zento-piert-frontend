import type { CreateOrderPayload, OrderResponse } from "@/types/order";

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<OrderResponse> {
  console.log("Create order payload:", payload);

  return {
    success: true,
    message: "A rendelést sikeresen rögzítettük.",
  };
}

// import { apiRequest } from "@/lib/api";
// import type { CheckoutRequestPayload } from "@/types/checkout";

// export interface CheckoutResponse {
//   success: boolean;
//   message: string;
// }

// export function submitCheckoutRequest(payload: CheckoutRequestPayload) {
//   return apiRequest<CheckoutResponse>("/checkout-requests", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// }
