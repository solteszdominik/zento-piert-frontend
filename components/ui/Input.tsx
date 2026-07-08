import type { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  hasError = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={[
        "rounded-2xl border px-4 py-3 outline-none transition",
        hasError
          ? "border-red-300 focus:border-red-500"
          : "border-blue-100 focus:border-blue-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
