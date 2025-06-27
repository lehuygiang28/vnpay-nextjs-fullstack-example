"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { vnpay, getClientIP, formatAmount, generateOrderId } from "@/lib/vnpay";
import { ProductCode, VnpLocale, VnpCurrCode, dateFormat } from "vnpay";
import type {
  BankOption,
  ProductCodeOption,
  LocaleOption,
  PaymentResult,
} from "@/types/payment";

// Define types for client-side use (without importing VNPay)
export interface PaymentFormData {
  amount: string;
  orderInfo: string;
  orderType: string;
  bankCode?: string;
  locale: string;
}

export type {
  BankOption,
  ProductCodeOption,
  LocaleOption,
  PaymentResult,
} from "@/types/payment";

// Server action to get bank list
export async function getBankListAction(): Promise<BankOption[]> {
  try {
    const banks = await vnpay.getBankList();
    return banks.map((bank) => ({
      bank_code: bank.bank_code,
      bank_name: bank.bank_name,
    }));
  } catch (error) {
    console.error("Failed to fetch bank list:", error);
    return [];
  }
}

// Server action to get product code options
export async function getProductCodeOptions(): Promise<ProductCodeOption[]> {
  return [
    { value: ProductCode.Other, label: "Khác" },
    { value: ProductCode.Fashion, label: "Thời trang" },
    { value: ProductCode.Food_Consumption, label: "Thực phẩm" },
    { value: ProductCode.Books_Newspapers_Magazines, label: "Sách & Báo chí" },
    { value: ProductCode.Electronics_Sound, label: "Điện tử" },
    { value: ProductCode.Phone_Tablet, label: "Điện thoại & Tablet" },
    { value: ProductCode.Hotel_Tourism, label: "Khách sạn & Du lịch" },
    { value: ProductCode.Cuisine, label: "Ẩm thực" },
    { value: ProductCode.Entertainment_Training, label: "Giải trí & Đào tạo" },
    { value: ProductCode.Health_Beauty, label: "Sức khỏe & Làm đẹp" },
  ];
}

// Server action to get locale options
export async function getLocaleOptions(): Promise<LocaleOption[]> {
  return [
    { value: VnpLocale.VN, label: "Tiếng Việt" },
    { value: VnpLocale.EN, label: "English" },
  ];
}

// Server action to create payment URL and redirect to VNPay
export async function createPaymentUrl(formData: FormData) {
  try {
    const headersList = await headers();
    const clientIP = getClientIP(headersList);

    // Extract form data
    const amount = formData.get("amount") as string;
    const orderInfo = formData.get("orderInfo") as string;
    const orderType = formData.get("orderType") as string;
    const bankCode = formData.get("bankCode") as string;
    const locale = formData.get("locale") as string;

    // Validation
    if (!amount || !orderInfo) {
      throw new Error("Amount and order info are required");
    }

    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < 1000) {
      throw new Error("Amount must be at least 1,000 VND");
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Build payment URL
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: formatAmount(numAmount),
      vnp_CreateDate: dateFormat(new Date()),
      vnp_CurrCode: VnpCurrCode.VND,
      vnp_IpAddr: clientIP,
      vnp_Locale: locale as VnpLocale,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType as ProductCode,
      vnp_ReturnUrl:
        process.env.VNPAY_RETURN_URL || "http://localhost:3000/payment/return",
      vnp_TxnRef: orderId,
      ...(bankCode && { vnp_BankCode: bankCode }),
    });

    console.log(`Generated payment URL for order ${orderId}:`, paymentUrl);

    // Redirect to VNPay
    redirect(paymentUrl);
  } catch (error) {
    console.error("Error creating payment URL:", error);
    throw error;
  }
}

// Server action to generate payment URL without redirecting (for demo purposes)
export async function generatePaymentUrlDemo(
  formData: FormData
): Promise<PaymentResult> {
  try {
    const headersList = await headers();
    const clientIP = getClientIP(headersList);

    // Extract form data
    const amount = formData.get("amount") as string;
    const orderInfo = formData.get("orderInfo") as string;
    const orderType = formData.get("orderType") as string;
    const bankCode = formData.get("bankCode") as string;
    const locale = formData.get("locale") as string;

    // Validation
    if (!amount || !orderInfo) {
      return {
        success: false,
        error: "Amount and order info are required",
      };
    }

    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < 1000) {
      return {
        success: false,
        error: "Amount must be at least 1,000 VND",
      };
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Build payment URL
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: formatAmount(numAmount),
      vnp_CreateDate: dateFormat(new Date()),
      vnp_CurrCode: VnpCurrCode.VND,
      vnp_IpAddr: clientIP,
      vnp_Locale: locale as VnpLocale,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType as ProductCode,
      vnp_ReturnUrl:
        process.env.VNPAY_RETURN_URL || "http://localhost:3000/payment/return",
      vnp_TxnRef: orderId,
      ...(bankCode && { vnp_BankCode: bankCode }),
    });

    console.log(`Generated demo payment URL for order ${orderId}:`, paymentUrl);

    return {
      success: true,
      paymentUrl,
      orderId,
    };
  } catch (error) {
    console.error("Error generating demo payment URL:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Legacy function - kept for backwards compatibility
export async function generatePaymentUrl(
  data: PaymentFormData
): Promise<string> {
  const headersList = await headers();
  const clientIP = getClientIP(headersList);

  const orderId = generateOrderId();
  const numAmount = parseInt(data.amount);

  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: formatAmount(numAmount),
    vnp_CreateDate: dateFormat(new Date()),
    vnp_CurrCode: VnpCurrCode.VND,
    vnp_IpAddr: clientIP,
    vnp_Locale: data.locale as VnpLocale,
    vnp_OrderInfo: data.orderInfo,
    vnp_OrderType: data.orderType as ProductCode,
    vnp_ReturnUrl:
      process.env.VNPAY_RETURN_URL || "http://localhost:3000/payment/return",
    vnp_TxnRef: orderId,
    ...(data.bankCode && { vnp_BankCode: data.bankCode }),
  });

  return paymentUrl;
}
