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
  onChange: (field: keyof OrderFormData, value: string) => void;
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
        <div className="grid gap-5">
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

          <Field label="Szállítási cím" required error={errors.customerAddress}>
            <Input
              required
              hasError={Boolean(errors.customerAddress)}
              value={formData.customerAddress}
              onChange={(event) =>
                onChange("customerAddress", event.target.value)
              }
            />
          </Field>

          <Field label="Cégnév">
            <Input
              value={formData.companyName}
              onChange={(event) => onChange("companyName", event.target.value)}
            />
          </Field>

          <Field label="Üzenet">
            <Textarea
              rows={5}
              value={formData.message}
              onChange={(event) => onChange("message", event.target.value)}
            />
          </Field>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          className="mt-6"
        >
          {isSubmitting ? "Küldés..." : "Rendelés leadása"}
        </Button>
      </form>
    </Card>
  );
}
