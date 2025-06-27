import { VNPay, HashAlgorithm } from "vnpay";

// VNPay configuration with fallback values for demo
const vnpayConfig = {
  tmnCode: process.env.VNPAY_TMN_CODE || "DEMO",
  secureSecret: process.env.VNPAY_SECURE_SECRET || "DEMOSECRET",
  vnpayHost: process.env.VNPAY_HOST || "https://sandbox.vnpayment.vn",
  testMode: process.env.VNPAY_TEST_MODE === "true" || true,
  returnUrl:
    process.env.VNPAY_RETURN_URL || "http://localhost:3000/payment/return",
};

// Initialize VNPay instance
export const vnpay = new VNPay({
  tmnCode: vnpayConfig.tmnCode,
  secureSecret: vnpayConfig.secureSecret,
  vnpayHost: vnpayConfig.vnpayHost,
  testMode: vnpayConfig.testMode,
  hashAlgorithm: HashAlgorithm.SHA512,
  enableLog: true,
});

// Export configuration for server-side use only
export { vnpayConfig };

// Utility functions for server-side use
export const getClientIP = (headers: Headers): string => {
  const forwardedFor = headers.get("x-forwarded-for");
  const realIP = headers.get("x-real-ip");
  const clientIP = headers.get("x-client-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return realIP || clientIP || "127.0.0.1";
};

export const formatAmount = (amount: number): number => {
  // VNPay expects amount in VND (smallest unit)
  // The vnpay library handles the multiplication by 100 automatically
  // This is placeholder, if your app need to format amount, you can do it here.
  return amount;
};

export const generateOrderId = (): string => {
  return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
