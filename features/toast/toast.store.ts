"use client";

import { create } from "zustand";
import type { Toast, ToastVariant } from "@/types/toast";

interface ShowToastParams {
  title?: string;
  message: string;
  variant?: ToastVariant;
}

interface ToastState {
  toasts: Toast[];
  showToast: (toast: ShowToastParams) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: ({ title, message, variant = "info" }) => {
    const id = crypto.randomUUID();

    set((state) => ({
      toasts: [...state.toasts, { id, title, message, variant }],
    }));

    window.setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
