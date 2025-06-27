"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { PaymentResult } from "@/components/payment/PaymentResult";
import { InfoPanels } from "@/components/payment/InfoPanels";
import {
  createPaymentUrl,
  generatePaymentUrlDemo,
  getBankListAction,
  getProductCodeOptions,
  getLocaleOptions,
  type BankOption,
  type ProductCodeOption,
  type LocaleOption,
  type PaymentResult as PaymentResultType,
} from "./actions/payment";

export default function HomePage() {
  const [banks, setBanks] = useState<BankOption[]>([]);
  const [productCodeOptions, setProductCodeOptions] = useState<
    ProductCodeOption[]
  >([]);
  const [localeOptions, setLocaleOptions] = useState<LocaleOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResultType | null>(
    null
  );

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [banksData, productCodes, locales] = await Promise.all([
          getBankListAction(),
          getProductCodeOptions(),
          getLocaleOptions(),
        ]);

        setBanks(banksData);
        setProductCodeOptions(productCodes);
        setLocaleOptions(locales);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };

    loadData();
  }, []);

  const handleRedirectPayment = async (formData: FormData) => {
    setLoading(true);
    try {
      await createPaymentUrl(formData);
    } catch (error) {
      console.error("Payment redirect failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateUrl = async (
    formData: FormData
  ): Promise<PaymentResultType> => {
    setLoading(true);
    try {
      const result = await generatePaymentUrlDemo(formData);
      setPaymentResult(result);
      return result;
    } catch (error) {
      console.error("URL generation failed:", error);
      const errorResult: PaymentResultType = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      setPaymentResult(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const clearPaymentResult = () => {
    setPaymentResult(null);
  };

  const resourceLinks = [
    {
      href: "https://github.com/lehuygiang28/vnpay-nextjs-fullstack-example",
      label: "GitHub",
      variant: "github" as const,
    },
    {
      href: "https://www.npmjs.com/package/vnpay",
      label: "NPM Package",
      variant: "npm" as const,
    },
    {
      href: "https://sandbox.vnpayment.vn/",
      label: "VNPay Sandbox",
      variant: "vnpay" as const,
    },
    {
      href: "https://sandbox.vnpayment.vn/apis/",
      label: "API Docs",
      variant: "docs" as const,
    },
  ];

  const poweredBy = [
    { name: "VNPay", url: "https://vnpay.vn" },
    { name: "Next.js 15", url: "https://nextjs.org" },
  ];

  const author = {
    name: "lehuygiang28",
    url: "https://github.com/lehuygiang28",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Header
          title="VNPay Next.js Demo"
          subtitle="Tích hợp Cổng Thanh toán VNPay với Next.js 15"
          resourceLinks={resourceLinks}
        />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <PaymentForm
            banks={banks}
            productCodeOptions={productCodeOptions}
            localeOptions={localeOptions}
            onRedirectPayment={handleRedirectPayment}
            onGenerateUrl={handleGenerateUrl}
            loading={loading}
          />

          <InfoPanels />
        </main>

        {paymentResult && (
          <div className="max-w-7xl mx-auto mt-8">
            <PaymentResult
              result={paymentResult}
              onClear={clearPaymentResult}
            />
          </div>
        )}

        <Footer
          poweredBy={poweredBy}
          repositoryUrl="https://github.com/lehuygiang28/vnpay-nextjs-fullstack-example"
          author={author}
        />
      </div>
    </div>
  );
}
