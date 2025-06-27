import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "VND"): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number): string {
  return value.toLocaleString("vi-VN");
}
