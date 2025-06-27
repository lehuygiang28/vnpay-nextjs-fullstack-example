"use client";

import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  EyeIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { formatNumber } from "@/lib/utils";
import type {
  BankOption,
  ProductCodeOption,
  LocaleOption,
  PaymentResult,
} from "@/types/payment";

interface PaymentFormProps {
  banks: BankOption[];
  productCodeOptions: ProductCodeOption[];
  localeOptions: LocaleOption[];
  onRedirectPayment: (formData: FormData) => Promise<void>;
  onGenerateUrl: (formData: FormData) => Promise<PaymentResult>;
  loading: boolean;
}

interface PaymentFormData {
  amount: string;
  orderInfo: string;
  orderType: string;
  bankCode: string;
  locale: string;
}

export function PaymentForm({
  banks,
  productCodeOptions,
  localeOptions,
  onRedirectPayment,
  onGenerateUrl,
  loading,
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: "50000",
    orderInfo: "Thanh toán đơn hàng demo - VNPay Next.js Integration",
    orderType: "",
    bankCode: "",
    locale: "",
  });

  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  // Initialize default values
  useEffect(() => {
    if (productCodeOptions.length > 0 && localeOptions.length > 0) {
      setFormData((prev) => ({
        ...prev,
        orderType: prev.orderType || productCodeOptions[0]?.value || "",
        locale: prev.locale || localeOptions[0]?.value || "",
      }));
    }
  }, [productCodeOptions, localeOptions]);

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    if (!formData.amount || parseInt(formData.amount) < 1000) {
      newErrors.amount = "Số tiền phải tối thiểu 1,000 VNĐ";
    }

    if (!formData.orderInfo.trim()) {
      newErrors.orderInfo = "Vui lòng nhập nội dung thanh toán";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const createFormData = (): FormData => {
    const form = new FormData();
    form.append("amount", formData.amount);
    form.append("orderInfo", formData.orderInfo);
    form.append("orderType", formData.orderType);
    form.append("bankCode", formData.bankCode);
    form.append("locale", formData.locale);
    return form;
  };

  const handleRedirectPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onRedirectPayment(createFormData());
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleGenerateUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onGenerateUrl(createFormData());
    } catch (error) {
      console.error("Generate URL error:", error);
    }
  };

  const bankOptions = [
    { value: "", label: "Chọn ngân hàng (hoặc để trống)" },
    ...banks.map((bank) => ({
      value: bank.bank_code,
      label: bank.bank_name,
    })),
  ];

  return (
    <section className="lg:col-span-2" aria-labelledby="payment-form-heading">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2
          id="payment-form-heading"
          className="text-2xl font-semibold text-gray-900 mb-6 flex items-center"
        >
          <BanknotesIcon
            className="w-6 h-6 mr-2 text-blue-600"
            aria-hidden="true"
          />
          Thông tin thanh toán
        </h2>

        <form className="space-y-6" noValidate>
          <Input
            type="number"
            label="Số tiền (VNĐ)"
            value={formData.amount}
            onChange={(e) => handleInputChange("amount", e.target.value)}
            error={errors.amount}
            helpText={`Số tiền hiện tại: ${formatNumber(
              parseInt(formData.amount || "0")
            )} VNĐ`}
            min="1000"
            step="1000"
            required
            placeholder="Nhập số tiền (tối thiểu 1,000 VNĐ)"
          />

          <Textarea
            label="Nội dung thanh toán"
            value={formData.orderInfo}
            onChange={(e) => handleInputChange("orderInfo", e.target.value)}
            error={errors.orderInfo}
            rows={3}
            required
            placeholder="Mô tả nội dung thanh toán..."
          />

          <Select
            label="Loại sản phẩm"
            value={formData.orderType}
            onChange={(e) => handleInputChange("orderType", e.target.value)}
            options={productCodeOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />

          <Select
            label="Ngân hàng (tùy chọn)"
            value={formData.bankCode}
            onChange={(e) => handleInputChange("bankCode", e.target.value)}
            options={bankOptions}
            helpText="Để trống để hiển thị tất cả ngân hàng trên trang VNPay"
          />

          <Select
            label="Ngôn ngữ"
            value={formData.locale}
            onChange={(e) => handleInputChange("locale", e.target.value)}
            options={localeOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={handleRedirectPayment}
              loading={loading}
              disabled={loading}
              size="lg"
              className="shadow-md"
            >
              {loading ? (
                "Đang xử lý..."
              ) : (
                <>
                  Chuyển đến VNPay
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleGenerateUrl}
              loading={loading}
              disabled={loading}
              variant="secondary"
              size="lg"
              className="bg-green-700 hover:bg-green-800 focus-visible:ring-green-500 text-white shadow-md"
            >
              {loading ? (
                "Đang tạo..."
              ) : (
                <>
                  Tạo URL Demo
                  <EyeIcon className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
