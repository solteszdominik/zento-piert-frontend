import type { ChangeEvent, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  hasError = false,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={[
        "resize-none rounded-2xl border px-4 py-3 outline-none transition",
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
