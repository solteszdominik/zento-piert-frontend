import type { CheckoutRequestPayload } from "@/types/checkout";

export interface CheckoutResponse {
  success: boolean;
  message: string;
}

export async function submitCheckoutRequest(
  payload: CheckoutRequestPayload,
): Promise<CheckoutResponse> {
  console.log("Checkout request payload:", payload);

  return {
    success: true,
    message: "Az ajánlatkérést sikeresen rögzítettük.",
  };
}
