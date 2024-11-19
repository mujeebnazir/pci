import client from "@/utils/appwrite";
import {  Databases, ID } from "appwrite";


const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const PRODUCT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCT ?? "";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  imageUrl: string[];
  createdAt?: string;
}

class ProductService {
  private databases: Databases;

  constructor() {
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
      return response.documents.map((document) => ({
        id: document.$id,
        name: document.name,
        description: document.description,
        price: document.price,
        categoryName: document.categoryId,
        imageUrl: document.imageUrl,
        createdAt: document.createdAt,
      }));
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
}

export default new ProductService();
