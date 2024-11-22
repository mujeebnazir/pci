import client from "@/utils/appwrite";
import { Account, Databases, ID, Storage } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const PRODUCT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCT ?? "";
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? "";

enum Size {
  L = "L",
  M = "M",
  SM = "SM",
  XL = "XL",
  XXL = "XXL",
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  sizesAvailable: Size[];
  itemsCount: number;
  category?: string;
  images?: string[]; 
  createdAt?: string;
}


class ProductService {
  private databases: Databases;
  private storage: Storage;

  constructor() {
    this.databases = new Databases(client);
    this.storage = new Storage(client);
  }

  /**
   * Upload images to Appwrite Storage
   * @param images Array of File objects
   * @returns Array of uploaded image IDs
   */
  private async uploadImages(images: File[]): Promise<string[]> {
    try {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const response = await this.storage.createFile(BUCKET_ID, ID.unique(), image);
          return response.$id; // Return the ID of the uploaded file
        })
      );
      return uploadedImages;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  }

  /**
   * Create or post a new product with images
   * @param product Product details excluding `id` and `createdAt`
   * @param images Array of File objects to be uploaded
   * @returns Created product document
   */
  async postProduct(product: Omit<Product, "id" | "createdAt" | "images">, images: File[]) {
    try {
      // Upload images and get their IDs
      const uploadedImages = await this.uploadImages(images);
  
      // Ensure itemCount is included in the product data
      if (!product.itemsCount) {
        throw new Error('Missing required field "itemsCount"');
      }
  
      // Add uploaded image IDs to the product
      const productWithImages = {
        ...product, // Spread the product details
        images: uploadedImages, // Use 'images' to match the Appwrite schema
        itemsCount: product.itemsCount, // Ensure you are passing itemsCount correctly
      };
  
      // Create the product document in the database
      const response = await this.databases.createDocument(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        ID.unique(),
        productWithImages // Send the product data with 'images'
      );
  
      return response;
    } catch (error) {
      console.error("Error creating product with images:", error);
      throw new Error("Failed to create product with images");
    }
  }
  
  /**
   * Delete a product by its ID
   * @param productId Product document ID
   */
  async deleteProduct(productId: string) {
    try {
      await this.databases.deleteDocument(DATABASE_ID, PRODUCT_COLLECTION_ID, productId);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }

  /**
   * Fetch all products or filter by category
   * @param categoryName Optional category name to filter products
   * @returns Array of products
   */
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const query = category ? [`category=${category}`] : [];
      const response = await this.databases.listDocuments(DATABASE_ID, PRODUCT_COLLECTION_ID, query);

      return response.documents.map((document) => ({
        id: document.$id,
        name: document.name,
        description: document.description,
        price: document.price,
        sizesAvailable: document.sizesAvailable,
        itemsCount: document.itemsCount,
        category: document.category,
        images: document.images,
        createdAt: document.$createdAt,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }
}

export default new ProductService();
