import client from "@/utils/appwrite";
import { Databases, ID , Query , Storage } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const ORDER_ITEMS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_ORDER_ITEMS ?? "";
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? "";
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

  async getOrderItemsByUserID(userID: string) {
    try {
      const response = await this.databases.listDocuments(
        DATABASE_ID,
        ORDER_ITEMS_COLLECTION_ID,
        [Query.equal("user", userID)]
      );
  
      // Refine the response for the profile display
      const userOrders = response.documents.map((document: any) => ({
        orderId: document.$id,
        status: document.status,
        createdAt: document.$createdAt,
        paymentMode: document.paymentMode,
        totalQuantity: document.cartItem.reduce((sum: number, item: any) => sum + item.quantity, 0),
        totalPrice: document.cartItem.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0),
        items: document.cartItem.map((cart: any) => ({
          name: cart.product.name,
          category: cart.product.category,
          description: cart.product.description,
          price: cart.product.price,
          quantity: cart.quantity,
          totalPrice: cart.product.price * cart.quantity,
          //file preview
          images: cart.product.images.map((image: any) => {
            const file = this.storage.getFileView(BUCKET_ID, image);
            return file;
          }  ), 
        })),
      }));
  
      return userOrders;
    } catch (error: any) {
      console.error("Error fetching order items:", error.message);
      throw error;
    }
  }
  
  async getAllOrdersForAdmin() {
    try {
      const response = await this.databases.listDocuments(DATABASE_ID, ORDER_ITEMS_COLLECTION_ID);

      // Map the response to include only relevant data
      const orders = response.documents.map((doc: any) => ({
        $id: doc.$id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        streetAddress: doc.streetAddress,
        city: doc.city,
        postalCode: doc.postalCode,
        paymentMode: doc.paymentMode,
        status: doc.status,
        cartItem: doc.cartItem.map((item: any) => ({
          product: {
            price: item.product.price
          },
          quantity: item.quantity
        }))
      }));
      console.log(orders);

      return orders;
    } catch (error: any) {
      console.error("Error fetching all orders:", error.message);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string) {
    try {
      const response = await this.databases.updateDocument(DATABASE_ID, ORDER_ITEMS_COLLECTION_ID, orderId, { status });
      return response;
    } catch (error: any) {
      console.error("Error updating order status:", error.message);
      throw error;
    }
  }

  async getAdminInsights(){
    
  }
}

export default new OrderService();
