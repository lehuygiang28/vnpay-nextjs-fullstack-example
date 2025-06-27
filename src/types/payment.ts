export interface BankOption {
  bank_code: string;
  bank_name: string;
}

export interface ProductCodeOption {
  value: string;
  label: string;
}

export interface LocaleOption {
  value: string;
  label: string;
}

export interface PaymentResult {
  success: boolean;
  paymentUrl?: string;
  orderId?: string;
  error?: string;
}
