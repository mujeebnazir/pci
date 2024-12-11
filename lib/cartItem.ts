//cartItem.ts
import client from "@/utils/appwrite";
import { Databases, ID, Query, Storage } from "appwrite";
import AuthService from "./auth";

interface Product {
  $id: string;
  id: string;
  name: string;
  images: string[];
  price: number;
}

interface CartItem {
  $id?: string;
  cartId?: string;
  product: Product;
  quantity: number;
}

class CartItemService {
  private databases: Databases;
  private storage: Storage;

  constructor() {
    this.databases = new Databases(client);
    this.storage = new Storage(client);
    if (
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEM ||
      !process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID
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

  async addCartItem(product: Product, quantity: number = 1): Promise<object> {
    try {
      console.log("product", product.id);

      const user = await this.getCurrentUser();
     
      const cartItem = await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEM!,
        ID.unique(),
        {
          cart: user.cartId,
          quantity,
          product: product.id,
        }
      );
      console.log("cartItem", cartItem);  
      return cartItem;
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
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEM!,
        id,
        { quantity }
      );
      return true;
    } catch (error: any) {
      console.error("Error updating cart item:", error.message);
      throw new Error("Error updating cart item");
    }
  }

  async removeCartItem($id: string): Promise<object> {
    try {
      const response = await this.databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEM!,
        $id
      );
      return response;
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
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART_ITEM!,
        [Query.equal("cart", user.cartId)]
      );

      return response.documents.map((document) => ({
        id: document.$id,
        cartId: document.cart,
        product: {
          ...document.product,
          images: document.product.images.map((imageId: string) =>
            this.storage.getFileView(
              process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
              imageId
            )
          ),
        },
        quantity: document.quantity,
      })) as CartItem[];
    } catch (error: any) {
      console.error("Error fetching cart items:", error.message);
      throw new Error("Error fetching cart items");
    }
  }
}

export default new CartItemService();
