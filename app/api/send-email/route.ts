import { NextRequest , NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/utils/sendEmail";

interface OrderConfirmationRequestBody {
    firstName: string;
    orderId: string;
    orderDate: string;
    items: Array<{
      name: string;
      quantity: number;
      price: string;
    }>;
    totalAmount: string;
    customerEmail: string;
  }
  
  export async function POST(req: NextRequest) {
    try {
      const body: OrderConfirmationRequestBody = await req.json();
      const requiredFields = ['firstName', 'orderId', 'items', 'totalAmount', 'customerEmail'];
      const missingFields = requiredFields.filter(field => !body[field as keyof OrderConfirmationRequestBody]);
  
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }

      const STORE_NAME = "Phalgham cottage industries";
      const SUPPORT_EMAIL = "support@phalghamcottageindustries.com";
  
      // Send the email
      const result = await sendOrderConfirmationEmail({
        ...body,
        storeName: STORE_NAME,
        supportEmail: SUPPORT_EMAIL,
        orderDate: body.orderDate || new Date().toLocaleDateString(),
      });
  
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Failed to send email' },
          { status: 500 }
        );
      }
  
      return NextResponse.json(
        { message: "Order confirmation email sent successfully" },
        { status: 200 }
      );
  
    } catch (error) {
      console.error('Error processing order confirmation request:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }