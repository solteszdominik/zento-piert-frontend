import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export default function Field({
  label,
  required = false,
  error,
  children,
}: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="font-semibold text-blue-950">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>

      {children}

      {error && (
        <span className="text-sm font-medium text-red-600">{error}</span>
      )}
    </label>
  );
}
