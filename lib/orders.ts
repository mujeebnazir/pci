import client from "@/utils/appwrite";
import { Databases, ID, Query, Storage } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const ORDER_ITEMS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ORDER_ITEMS ?? "";

export enum PaymentMode {
  COD = "COD",
  UPI = "UPI",
}

export enum Status {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  PROCESSING = "PROCESSING",
  ON_THE_WAY = "ON THE WAY",
}

interface OrderItem {
  user: string;
  cartItem: string[];
  productDetails?: string[];
  paymentMode: PaymentMode;
  status: Status;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

class OrderService {
  private databases: Databases;
  private storage: Storage;
  constructor() {
    this.databases = new Databases(client);
    this.storage = new Storage(client);
  }

  /**
   * Validates the payload before sending it to Appwrite
   * @param payload - The order item payload to validate
   */
  private validatePayload(payload: OrderItem) {
    if (!payload.user || typeof payload.user !== "string") {
      throw new Error(
        "The 'user' field must be a single document ID (string)."
      );
    }

    if (
      !Array.isArray(payload.cartItem) ||
      !payload.cartItem.every((id) => typeof id === "string")
    ) {
      throw new Error(
        "The 'cartItem' field must be an array of document IDs (strings)."
      );
    }
  }

  /**
   * Creates a new order item in Appwrite
   * @param payload - The order item payload
   */
  async createOrderItem(payload: OrderItem) {
    console.log("payload", payload);
    try {
      this.validatePayload(payload);

      const response = await this.databases.createDocument(
        DATABASE_ID,
        ORDER_ITEMS_COLLECTION_ID,
        ID.unique(),
        payload
      );
      const parsedProductDetails = payload.productDetails?.map((item) => JSON.parse(item));
      const emailPayload = {
        firstName: payload.firstName,
        orderId: response.$id,
        orderDate: new Date().toLocaleDateString(),
        items: parsedProductDetails?.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: parsedProductDetails?.reduce(
          (sum: number, item: any) => sum + item.product.price * item.quantity,
          0
        ),
        customerEmail: payload.email,
      };

      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        });
        console.log("emailResponse", emailResponse);
      } catch (error: any) {
        console.error("Error sending email:", error.message);
      }

      return response;
    } catch (error: any) {
      console.error("Error creating order item:", error.message);
      throw error;
    }
  }

  async getOrderItemsByUserID(userID: string) {
    try {
      // Fetch documents related to the user
      const response = await this.databases.listDocuments(
        DATABASE_ID,
        ORDER_ITEMS_COLLECTION_ID,
        [Query.equal("user", userID)]
      );

      console.log("response", response);

      // Parse productDetails and map it correctly
      const userOrders = response.documents.map((document: any) => {
        const productDetails = document.productDetails.map((product: any) =>
          JSON.parse(product)
        );
        console.log("productDetails", productDetails);
        return {
          orderId: document.$id,
          status: document.status,
          createdAt: document.$createdAt,
          paymentMode: document.paymentMode,
          totalQuantity: productDetails.reduce(
            (sum: number, item: any) => sum + item.quantity,
            0
          ),
          totalPrice: productDetails.reduce(
            (sum: number, item: any) =>
              sum + item.product.price * item.quantity,
            0
          ),
          items: productDetails.map((product: any) => ({
            name: product.product.name,
            category: product.product.category,
            description: product.product.description,
            price: product.product.price,
            quantity: product.quantity,
            totalPrice: product.product.price * product.quantity,
            images: product.product.images,
          })),
        };
      });
      console.log("userOrders", userOrders);
      return userOrders;
    } catch (error: any) {
      console.error("Error fetching order items:", error.message);
      throw error;
    }
  }

  async getAllOrdersForAdmin() {
    try {
      const response = await this.databases.listDocuments(
        DATABASE_ID,
        ORDER_ITEMS_COLLECTION_ID
      );

      console.log("response", response);

      const adminOrders = response.documents.map((document: any) => {
        const productDetails = document.productDetails.map((product: any) =>
          JSON.parse(product)
        );
        console.log("productDetails", productDetails);
        return {
          orderId: document.$id,
          status: document.status,
          createdAt: document.$createdAt,
          firstName: document.firstName,
          lastName: document.lastName,
          streetAddress: document.streetAddress,
          city: document.city,
          postalCode: document.postalCode,
          paymentMode: document.paymentMode,
          totalQuantity: productDetails.reduce(
            (sum: number, item: any) => sum + item.quantity,
            0
          ),
          totalPrice: productDetails.reduce(
            (sum: number, item: any) =>
              sum + item.product.price * item.quantity,
            0
          ),
          items: productDetails.map((product: any) => ({
            name: product.product.name,
            category: product.product.category,
            description: product.product.description,
            price: product.product.price,
            quantity: product.quantity,
            totalPrice: product.product.price * product.quantity,
            images: product.product.images,
          })),
        };
      });
      console.log("adminOrders", adminOrders);
      return adminOrders;
    } catch (error: any) {
      console.error("Error fetching all orders:", error.message);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string) {
    try {
      const response = await this.databases.updateDocument(
        DATABASE_ID,
        ORDER_ITEMS_COLLECTION_ID,
        orderId,
        { status }
      );
      return response;
    } catch (error: any) {
      console.error("Error updating order status:", error.message);
      throw error;
    }
  }

  async getAdminInsights() {}
}

export default new OrderService();
