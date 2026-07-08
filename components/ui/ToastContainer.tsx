"use client";

import { useToastStore } from "@/features/toast/toast.store";

const variantClasses = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-blue-200 bg-blue-50 text-blue-900",
};

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed right-5 top-5 z-50 flex w-[calc(100%-40px)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-2xl border p-4 shadow-lg ${variantClasses[toast.variant]}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {toast.title && <p className="font-bold">{toast.title}</p>}

              <p className="text-sm leading-6">{toast.message}</p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-lg leading-none opacity-70 transition hover:opacity-100"
              aria-label="Értesítés bezárása"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
