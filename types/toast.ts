export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
}
