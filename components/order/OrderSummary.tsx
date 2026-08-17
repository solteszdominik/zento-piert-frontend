import type { CartItem } from "@/types/cart";
import type { ShippingMethod } from "@/config/shipping";
import { shippingMethods } from "@/config/shipping";
import { getCartItemTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

interface OrderSummaryProps {
  items: CartItem[];
  productsTotal: number;
  shippingMethod: ShippingMethod;
}

export default function OrderSummary({
  items,
  productsTotal,
  shippingMethod,
}: OrderSummaryProps) {
  const shippingPrice = shippingMethods[shippingMethod].price;
  const grandTotal = productsTotal + shippingPrice;

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

      <div className="mt-6 space-y-3 border-t border-blue-200 pt-5">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Termékek összesen</span>
          <span>{formatPrice(productsTotal)}</span>
        </div>

        <div className="flex justify-between text-sm text-slate-600">
          <span>{shippingMethods[shippingMethod].label}</span>

          <span>
            {shippingPrice === 0 ? "Díjmentes" : formatPrice(shippingPrice)}
          </span>
        </div>

        <div className="flex justify-between border-t border-blue-200 pt-4 text-lg font-bold text-blue-950">
          <span>Végösszeg</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>
    </aside>
  );
}
