import type { CartItem } from "@/types/cart";
import { getCartItemTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

export default function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <aside className="h-fit rounded-3xl border border-blue-100 bg-blue-50 p-6">
      <h2 className="text-xl font-bold text-blue-950">Kosár tartalma</h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between gap-4 border-b border-blue-100 pb-3 text-sm"
          >
            <div>
              <p className="font-semibold text-blue-950">{item.product.name}</p>
              <p className="text-slate-600">
                {item.quantity} × {formatPrice(item.product.price)} /{" "}
                {item.product.unit}
              </p>
            </div>

            <strong className="text-blue-950">
              {formatPrice(getCartItemTotal(item))}
            </strong>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between text-lg font-bold text-blue-950">
        <span>Összesen</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </aside>
  );
}
