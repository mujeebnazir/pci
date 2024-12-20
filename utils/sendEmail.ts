import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOrderConfirmationEmailParams {
  firstName: string;
  orderId: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
  totalAmount: string;
  storeName: string;
  supportEmail: string;
  customerEmail: string; 
}

export async function sendOrderConfirmationEmail({
  firstName,
  orderId,
  orderDate,
  items,
  totalAmount,
  storeName,
  supportEmail,
  customerEmail,
}: SendOrderConfirmationEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required fields
    if (!customerEmail || !orderId || !firstName) {
      throw new Error('Missing required fields');
    }

    const response = await resend.emails.send({
      from: `${storeName || "Phalgham cottage industries"} <${process.env.RESEND_DOMAIN}>`,
      to: customerEmail,
      subject: `Order Confirmation  - ${orderId}`,
      react: OrderConfirmationEmail({
        firstName,
        orderId,
        orderDate,
        items,
        totalAmount,
        storeName,
        supportEmail,
      }),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}