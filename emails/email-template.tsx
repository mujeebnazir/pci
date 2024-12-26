import * as React from "react";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface EmailTemplateProps {
  firstName: string;
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  totalAmount: string;
  storeName: string;
  supportEmail: string;
}

export const OrderConfirmationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  orderId,
  orderDate,
  items,
  totalAmount,
  storeName,
  supportEmail,
}) => (
  <div style={{
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#111",
    backgroundColor: "#fafafa",
    padding: "20px",
    lineHeight: "1.6",
    minWidth: "320px",
    maxWidth: "100%",
  }}>
    <table style={{
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
    }}>
      <thead>
        <tr>
          <th colSpan={2} style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "24px 20px",
            textAlign: "left",
          }}>
            <div style={{
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "8px",
              color: "#888",
            }}>
              {storeName}
            </div>
            <div style={{
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "8px",
              color: "#888",
            }}>
              Order Confirmation
            </div>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>
              Thank you for your order!
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2} style={{ padding: "24px 20px" }}>
            <p style={{
              fontSize: "18px",
              fontWeight: "600",
              margin: "0 0 12px 0",
            }}>
              Hi {firstName},
            </p>
            <p style={{ color: "#555", margin: "0", fontSize: "15px" }}>
              We've received your order and we're getting it ready. You'll receive another email when your order ships.
            </p>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: "0 20px" }}>
            <div style={{
              padding: "20px",
              backgroundColor: "#f8f8f8",
              borderRadius: "12px",
              marginBottom: "24px",
            }}>
              <div style={{
                marginBottom: "12px",
                borderBottom: "1px solid #eee",
                paddingBottom: "12px",
              }}>
                <div style={{ color: "#666", fontSize: "13px", marginBottom: "4px" }}>ORDER ID</div>
                <div style={{ fontWeight: "600", fontSize: "15px" }}>{orderId}</div>
              </div>
              <div>
                <div style={{ color: "#666", fontSize: "13px", marginBottom: "4px" }}>ORDER DATE</div>
                <div style={{ fontWeight: "600", fontSize: "15px" }}>{orderDate}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: "0 20px" }}>
            <div style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
            }}>
              <div style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#666",
              }}>
                Order Summary
              </div>
              {items.map((item, index) => (
                <div key={index} style={{
                  padding: "12px 0",
                  borderBottom: index !== items.length - 1 ? "1px solid #eee" : "none",
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}>
                    <div style={{ flex: "1", minWidth: "200px" }}>
                      <div style={{ fontWeight: "500", marginBottom: "4px" }}>{item.name}</div>
                      <div style={{ color: "#666", fontSize: "14px" }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: "600", fontSize: "15px" }}>{item.price}</div>
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "2px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>Total</span>
                <span style={{ fontSize: "18px", fontWeight: "700" }}>{totalAmount}</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: "0 20px 24px 20px", textAlign: "center" }}>
            <a href="/order-tracking" style={{
              backgroundColor: "#000",
              color: "#fff",
              textDecoration: "none",
              padding: "16px 32px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "500",
              display: "inline-block",
              width: "100%",
              maxWidth: "300px",
              textAlign: "center",
              boxSizing: "border-box",
            }}>
              Track Your Order
            </a>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{
            padding: "24px 20px",
            backgroundColor: "#f8f8f8",
            textAlign: "center",
            borderTop: "1px solid #eee",
          }}>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px 0" }}>
              Questions about your order?
            </p>
            <a href={`mailto:${supportEmail}`} style={{
              color: "#000",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "15px",
              padding: "8px 16px",
              backgroundColor: "#fff",
              borderRadius: "6px",
              display: "inline-block",
            }}>
              Contact Support
            </a>
            <p style={{ 
              fontSize: "13px", 
              color: "#999", 
              margin: "24px 0 0 0",
              borderTop: "1px solid #eee",
              paddingTop: "24px",
            }}>
              © {new Date().getFullYear()} {storeName}. All rights reserved.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);