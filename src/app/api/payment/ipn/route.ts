import { NextRequest, NextResponse } from "next/server";
import { vnpay } from "@/lib/vnpay";
import {
  VerifyIpnCall,
  IpnFailChecksum,
  IpnOrderNotFound,
  IpnInvalidAmount,
  InpOrderAlreadyConfirmed,
  IpnSuccess,
  IpnUnknownError,
} from "vnpay";

// Mock database functions - replace with your actual database operations
interface Order {
  orderId: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

// Mock order storage (in real app, use database)
const orders = new Map<string, Order>();

async function findOrderById(orderId: string): Promise<Order | null> {
  // In a real application, this would query your database
  return orders.get(orderId) || null;
}

async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<void> {
  // In a real application, this would update your database
  const order = orders.get(orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date();
    orders.set(orderId, order);
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());

    console.log("IPN received:", queryParams);

    // Verify the IPN call
    const verify = vnpay.verifyIpnCall(queryParams as unknown as VerifyIpnCall);

    // Check if the verification is successful
    if (!verify.isVerified) {
      console.log("IPN verification failed: Invalid checksum");
      return NextResponse.json(IpnFailChecksum);
    }

    if (!verify.isSuccess) {
      console.log("IPN verification failed: Payment was not successful");
      return NextResponse.json(IpnUnknownError);
    }

    // Find the order in the database
    const foundOrder = await findOrderById(verify.vnp_TxnRef);

    // Check if order exists
    if (!foundOrder || verify.vnp_TxnRef !== foundOrder.orderId) {
      console.log("IPN verification failed: Order not found");
      return NextResponse.json(IpnOrderNotFound);
    }

    // Check if the payment amount matches
    if (verify.vnp_Amount !== foundOrder.amount) {
      console.log("IPN verification failed: Amount mismatch");
      return NextResponse.json(IpnInvalidAmount);
    }

    // Check if the order has already been confirmed
    if (foundOrder.status === "completed") {
      console.log("IPN verification: Order already confirmed");
      return NextResponse.json(InpOrderAlreadyConfirmed);
    }

    // Update the order status to completed
    await updateOrderStatus(foundOrder.orderId, "completed");

    console.log("IPN verification successful: Order completed", {
      orderId: foundOrder.orderId,
      amount: foundOrder.amount,
      transactionNo: verify.vnp_TransactionNo,
    });

    // Return success response to VNPay
    return NextResponse.json(IpnSuccess);
  } catch (error) {
    console.error("IPN processing error:", error);
    return NextResponse.json(IpnUnknownError);
  }
}

// VNPay may also send POST requests, so handle both methods
export async function POST(request: NextRequest) {
  return GET(request);
}
