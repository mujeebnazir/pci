import * as React from "react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShippingEmailProps {
  firstName: string;
  orderId: string;
  items: OrderItem[];
  estimatedDelivery: string;
  shippingAddress: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
  };
  storeName: string;
  supportEmail: string;
}

export const ShippingConfirmationEmail: React.FC<
  Readonly<ShippingEmailProps>
> = ({
  firstName,
  orderId,
  items,
  estimatedDelivery,
  shippingAddress,
  storeName,
  supportEmail,
}) => (
  <div
    style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: "#000",
      backgroundColor: "#fff",
      padding: "32px 20px",
      lineHeight: "1.5",
    }}
  >
    <table
      style={{
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
        backgroundColor: "#fff",
        border: "1px solid #000",
      }}
    >
      {/* Header remains the same */}
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "32px 24px",
              textAlign: "left",
              borderBottom: "2px solid #000",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              {storeName}
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
              }}
            >
              Shipping Confirmation
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: "32px 24px", borderBottom: "1px solid #eee" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "0 0 16px 0",
                letterSpacing: "-0.3px",
              }}
            >
              Hi {firstName},
            </p>
            <p style={{ fontSize: "16px", margin: "0", lineHeight: "1.6" }}>
              Your order{" "}
              <strong style={{ borderBottom: "2px solid #000" }}>
                #{orderId}
              </strong>{" "}
              has been shipped and is on its way. Soon you will receive a call
              from our delivery executive to confirm the delivery.
            </p>
          </td>
        </tr>
        <tr>
          <td style={{ padding: "32px 24px" }}>
            <div
              style={{
                border: "1px solid #000",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              {/* Items Section */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Items Shipped
                </div>
                {items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 0",
                      borderBottom:
                        index !== items.length - 1 ? "1px solid #eee" : "none",
                      fontSize: "14px",
                    }}
                  >
                    <strong>{item.name}</strong> × {item.quantity}
                  </div>
                ))}
              </div>
              {/* Delivery and Address sections remain the same */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Estimated Delivery
                </div>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {estimatedDelivery}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Shipping Address
                </div>
                <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
                  {shippingAddress.streetAddress}
                  <br />
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.postalCode}
                </div>
              </div>
            </div>
          </td>
        </tr>
        {/* Footer remains the same */}
        <tr>
          <td
            style={{
              padding: "32px 24px",
              textAlign: "center",
              borderTop: "1px solid #000",
              backgroundColor: "#fff",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                margin: "0 0 16px 0",
                letterSpacing: "0.3px",
              }}
            >
              Questions about your shipment?
            </p>
            <a
              href={`mailto:${supportEmail}`}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "14px",
                padding: "12px 32px",
                display: "inline-block",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Contact Support
            </a>
            <p
              style={{
                fontSize: "12px",
                margin: "32px 0 0 0",
                color: "#666",
                borderTop: "1px solid #eee",
                paddingTop: "32px",
              }}
            >
              © {new Date().getFullYear()} {storeName}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
