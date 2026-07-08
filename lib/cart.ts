import type { CartItem } from "@/types/cart";

export function getCartTotalQuantity(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotalPrice(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
}

export function getCartItemTotal(item: CartItem) {
  return item.product.price * item.quantity;
}
