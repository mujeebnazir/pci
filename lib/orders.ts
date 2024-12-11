import client from "@/utils/appwrite";
import { Databases, ID } from "appwrite";

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

  constructor() {
    this.databases = new Databases(client);
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
    try {
      this.validatePayload(payload);

      const response = await this.databases.createDocument(
        DATABASE_ID,
        ORDER_ITEMS_COLLECTION_ID,
        ID.unique(),
        payload
      );
      return response;
    } catch (error: any) {
      console.error("Error creating order item:", error.message);
      throw error;
    }
  }
}

export default new OrderService();
