import { Resend } from "resend";
import { ShippingConfirmationEmail } from "../emails/email-admin-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAdminEmail({
  order,
}: any): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await resend.emails.send({
      from: `"Phalgham cottage industries" <${process.env.RESEND_DOMAIN}>`,
      to: order.email,
      subject: `Shipping Confirmation for Order #${order.orderId}`,
      react: ShippingConfirmationEmail({
        firstName: order.firstName,
        orderId: order.orderId,
        items: order.items,
        estimatedDelivery: "7-10 business days",
        shippingAddress: {
          streetAddress: order.streetAddress,
          city: order.city,
          state: order.state,
          postalCode: order.postalCode,
        },
        storeName: "Phalgham cottage industries",
        supportEmail: "pahalgamcottage@gmail.com",
      }),
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending shipping confirmation:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to send shipping confirmation",
    };
  }
}
