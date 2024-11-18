import client from "@/utils/appwrite";
import { Account, Databases, ID } from "appwrite";

// Replace with your Appwrite database and collection IDs
const DATABASE_ID = "your_database_id";
const PRODUCT_COLLECTION_ID = "your_product_collection_id";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  createdAt?: string;
}

class ProductService {
  private account: Account;
  private databases: Databases;

  constructor() {
    this.account = new Account(client);
    this.databases = new Databases(client);
  }

  // Create or post a new product
  async postProduct(product: Omit<Product, "id" | "createdAt">) {
    try {
      const response = await this.databases.createDocument(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        ID.unique(),
        product
      );
      return response;
    } catch (error) {
      throw new Error("Error posting product");
    }
  }

  // Delete a product by its ID
  async deleteProduct(productId: string) {
    try {
      await this.databases.deleteDocument(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        productId
      );
      return true;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }

  // Get all products or filter by category
  async getProducts(categoryId?: string): Promise<Product[]> {
    try {
      const query = categoryId ? [`categoryId=${categoryId}`] : [];
      const response = await this.databases.listDocuments(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        query
      );
      return response.documents as Product[];
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
}

export default new ProductService();
