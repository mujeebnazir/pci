import client from "@/utils/appwrite";
import { Databases, ID, Query } from "appwrite";
import AuthService from "./auth";

interface CartItem {
  id?: string;
  cartId: string;
  product: object;
  quantity: number;
}

class CartItemService {
  private databases: Databases;

  constructor() {
    this.databases = new Databases(client);

    if (
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEMS
    ) {
      throw new Error("Missing Appwrite environment variables");
    }
  }

  private async getCurrentUser() {
    const user = await AuthService.getCurrentUser();
    if (!user || !user.cartId) {
      throw new Error("User not authenticated or missing cartId");
    }
    return user;
  }

  async addCartItem(
    product: CartItem["product"],
    quantity: number = 1
  ): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEMS!,
        ID.unique(),
        {
          cartId: user.cartId,
          product,
          quantity,
        }
      );
      return true;
    } catch (error: any) {
      console.error("Error adding cart item:", error.message);
      throw new Error("Error adding cart item");
    }
  }

  async updateCartItem(quantity: number, id: string): Promise<boolean> {
    try {
      await this.getCurrentUser();
      await this.databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEMS!,
        id,
        { quantity }
      );
      return true;
    } catch (error: any) {
      console.error("Error updating cart item:", error.message);
      throw new Error("Error updating cart item");
    }
  }

  async removeCartItem(id: string): Promise<boolean> {
    try {
      await this.databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEMS!,
        id
      );
      return true;
    } catch (error: any) {
      console.error("Error removing cart item:", error.message);
      throw new Error("Error removing cart item");
    }
  }

  async getCartItems(): Promise<CartItem[]> {
    try {
      const user = await this.getCurrentUser();
      const response = await this.databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEMS!,
        [Query.equal("cartId", user.cartId)]
      );
      return response.documents.map((document) => ({
        id: document.$id,
        cartId: document.cartId,
        product: document.product,
        quantity: document.quantity,
      })) as CartItem[];
    } catch (error: any) {
      console.error("Error fetching cart items:", error.message);
      throw new Error("Error fetching cart items");
    }
  }
}

export default new CartItemService();
