"use client";

import { useState } from "react";
import {
  CheckIcon,
  ClipboardDocumentIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import type { PaymentResult as PaymentResultType } from "@/types/payment";

interface PaymentResultProps {
  result: PaymentResultType | null;
  onClear: () => void;
}

export function PaymentResult({ result, onClear }: PaymentResultProps) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopyUrl = async () => {
    if (result.paymentUrl) {
      try {
        await navigator.clipboard.writeText(result.paymentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy URL:", error);
      }
    }
  };

  return (
    <section
      className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200"
      aria-labelledby="payment-result-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          id="payment-result-heading"
          className="text-lg font-semibold text-gray-900 flex items-center"
        >
          {result.success ? (
            <>
              <CheckIcon
                className="w-5 h-5 text-green-600 mr-2"
                aria-hidden="true"
              />
              URL Thanh toán đã tạo thành công
            </>
          ) : (
            <>
              <ExclamationCircleIcon
                className="w-5 h-5 text-red-600 mr-2"
                aria-hidden="true"
              />
              Có lỗi xảy ra
            </>
          )}
        </h3>

        <Button
          onClick={onClear}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          Đóng
        </Button>
      </div>

      {result.success && result.paymentUrl && (
        <div className="space-y-4">
          {result.orderId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã đơn hàng:
              </label>
              <code className="block w-full p-3 bg-white border border-gray-300 rounded-lg text-sm font-mono text-gray-900">
                {result.orderId}
              </code>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Thanh toán:
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm font-mono text-gray-900 break-all">
                {result.paymentUrl}
              </code>
              <Button
                onClick={handleCopyUrl}
                variant="secondary"
                size="sm"
                className="flex-shrink-0"
                aria-label="Copy payment URL"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Đã sao chép
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="w-4 h-4 mr-1" />
                    Sao chép
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => window.open(result.paymentUrl, "_blank")}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              Mở trong tab mới
            </Button>

            <Button
              onClick={() => (window.location.href = result.paymentUrl!)}
              variant="secondary"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              Chuyển hướng ngay
            </Button>
          </div>
        </div>
      )}

      {!result.success && result.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{result.error}</p>
        </div>
      )}
    </section>
  );
}
