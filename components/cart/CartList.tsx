import type { CartItem as CartItemType } from "@/types/cart";
import CartItem from "@/components/cart/CartItem";

interface CartListProps {
  items: CartItemType[];
}

export default function CartList({ items }: CartListProps) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
    </div>
  );
}
