import Link from "next/link";
import type { FormEvent } from "react";

import type { OrderFormData } from "@/types/order";
import type { CheckoutFormErrors } from "@/lib/validation/order";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface CheckoutFormProps {
  formData: OrderFormData;
  errors: CheckoutFormErrors;
  isSubmitting: boolean;
  onChange: (field: keyof OrderFormData, value: string | boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function CheckoutForm({
  formData,
  errors,
  isSubmitting,
  onChange,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="space-y-5">
          <Field label="Név" required error={errors.customerName}>
            <Input
              required
              hasError={Boolean(errors.customerName)}
              value={formData.customerName}
              onChange={(event) => onChange("customerName", event.target.value)}
            />
          </Field>

          <Field label="E-mail" required error={errors.customerEmail}>
            <Input
              required
              type="email"
              hasError={Boolean(errors.customerEmail)}
              value={formData.customerEmail}
              onChange={(event) =>
                onChange("customerEmail", event.target.value)
              }
            />
          </Field>

          <Field label="Telefonszám" required error={errors.customerPhone}>
            <Input
              required
              hasError={Boolean(errors.customerPhone)}
              value={formData.customerPhone}
              onChange={(event) =>
                onChange("customerPhone", event.target.value)
              }
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
            <Field label="Irányítószám" required error={errors.postalCode}>
              <Input
                required
                inputMode="numeric"
                maxLength={4}
                hasError={Boolean(errors.postalCode)}
                value={formData.postalCode}
                onChange={(event) => onChange("postalCode", event.target.value)}
              />
            </Field>

            <Field label="Város" required error={errors.city}>
              <Input
                required
                hasError={Boolean(errors.city)}
                value={formData.city}
                onChange={(event) => onChange("city", event.target.value)}
              />
            </Field>
          </div>

          <Field label="Utca, házszám" required error={errors.streetAddress}>
            <Input
              required
              hasError={Boolean(errors.streetAddress)}
              value={formData.streetAddress}
              onChange={(event) =>
                onChange("streetAddress", event.target.value)
              }
            />
          </Field>

          <Field label="Cégnév">
            <Input
              value={formData.companyName}
              onChange={(event) => onChange("companyName", event.target.value)}
            />
          </Field>

          <Field label="Szállítási mód" required error={errors.shippingMethod}>
            <select
              value={formData.shippingMethod}
              onChange={(event) =>
                onChange("shippingMethod", event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500"
            >
              <option value="standard">Standard szállítás</option>
            </select>
          </Field>

          <Field label="Megjegyzés">
            <Textarea
              rows={5}
              value={formData.message}
              onChange={(event) => onChange("message", event.target.value)}
            />
          </Field>

          <div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(event) =>
                  onChange("termsAccepted", event.target.checked)
                }
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm leading-6 text-slate-600">
                Elolvastam és elfogadom az{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  ÁSZF-et
                </Link>{" "}
                és az{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Adatkezelési tájékoztatót
                </Link>
                .
              </span>
            </label>

            {errors.termsAccepted && (
              <p className="mt-2 text-sm text-red-600">
                {errors.termsAccepted}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !formData.termsAccepted}
          fullWidth
          className="mt-6"
        >
          {isSubmitting ? "Rendelés feldolgozása..." : "Rendelés leadása"}
        </Button>
      </form>
    </Card>
  );
}
