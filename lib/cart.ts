import client from "@/utils/appwrite";
import { Databases, ID } from "appwrite";
import AuthService from "./auth";

class CartService {
  private databases: Databases;
  constructor() {
    this.databases = new Databases(client);
  }

  private async getCurrentUser() {
    const user = await AuthService.getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    return user;
  }

  async createCart() {
    try {
      const user = await this.getCurrentUser();
      const response = await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART as string,
        ID.unique(),
        {
          //   user.$id
        }
      );
      return response;
    } catch (error) {
      throw new Error("Error creating cart");
    }
  }
}

export default new CartService();
