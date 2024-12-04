import client from "@/utils/appwrite";
import { Account, Databases, ID, Storage, Query } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const PRODUCT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PRODUCT ?? "";
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
          const response = await this.storage.createFile(
            BUCKET_ID,
            ID.unique(),
            image
          );
          return response.$id;
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
  async postProduct(
    product: Omit<Product, "id" | "createdAt" | "images">,
    images: File[]
  ) {
    try {
      const uploadedImages = await this.uploadImages(images);

      if (
        !product.itemsCount ||
        product.name === "" ||
        product.description === "" ||
        product.price === 0 ||
        product.category === ""
      ) {
        throw new Error("Missing required fields");
      }

      const productWithImages = {
        ...product,
        images: uploadedImages,
        itemsCount: product.itemsCount,
      };

      const response = await this.databases.createDocument(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        ID.unique(),
        productWithImages
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
    if (!productId) {
      throw new Error("Product id is required");
    }
    try {
      await this.databases.deleteDocument(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        productId
      );
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }

  /**
   * Fetch all products or filter by category with pagination
   * @param category Optional category name to filter products
   * @param limit Number of products to fetch per page (default: 10)
   * @param offset Starting point for fetching products (default: 0)
   * @returns Object containing products and pagination metadata
   */
  async getProducts(
    category?: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<{ products: Product[]; total: number }> {
    try {
      const query = [
        ...(category ? [Query.equal("category", category)] : []),
        Query.limit(limit),
        Query.offset(offset),
      ];
      console.log("Query being executed:", query);

      const response = await this.databases.listDocuments(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        query
      );

      const products = response.documents.map((document) => ({
        id: document.$id,
        name: document.name,
        description: document.description,
        price: document.price,
        sizesAvailable: document.sizesAvailable,
        itemsCount: document.itemsCount,
        category: document.category,
        images: document.images.map((imageId: string) =>
          this.storage.getFileView(BUCKET_ID, imageId)
        ),
        createdAt: document.$createdAt,
      }));

      return { products, total: response.total };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async getProduct(id: string): Promise<any> {
    try {
      if (!id) {
        console.log("Product id is required");
      }
      const response = await this.databases.getDocument(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        id
      );

      const images = await response.images.map((imageId: string) =>
        this.storage.getFileView(BUCKET_ID, imageId)
      );
      return { ...response, images };
    } catch (error) {
      console.error("Error fetching product:", error);
      return Promise.reject(error);
    }
  }
  /**
   * Update specific fields of a product
   * @param productId Product document ID
   * @param updates Partial update data: price, sizesAvailable, itemsCount
   * @returns Updated product document
   */
  async updateProduct(
    productId: string,
    updates: Partial<Pick<Product, "price" | "sizesAvailable" | "itemsCount">>
  ) {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      // Validate the fields to be updated
      const { price, sizesAvailable, itemsCount } = updates;
      if (
        price === undefined &&
        sizesAvailable === undefined &&
        itemsCount === undefined
      ) {
        throw new Error("No fields provided for update");
      }

      // Prepare the update data
      const updateData: Partial<
        Pick<Product, "price" | "sizesAvailable" | "itemsCount">
      > = {};
      if (price !== undefined) updateData.price = price;
      if (sizesAvailable !== undefined)
        updateData.sizesAvailable = sizesAvailable;
      if (itemsCount !== undefined) updateData.itemsCount = itemsCount;

      // Update the product document in the database
      const response = await this.databases.updateDocument(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        productId,
        updateData
      );

      return response;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  }

  async searchProducts(query: string, limit: number = 30, offset: number = 0) {
    try {
      const filters = [Query.search("name", query)];

      const response = await this.databases.listDocuments(
        DATABASE_ID,
        PRODUCT_COLLECTION_ID,
        [...filters, Query.limit(limit), Query.offset(offset)]
      );

      const products = response.documents.map((document) => ({
        id: document.$id,
        name: document.name,
        description: document.description,
        price: document.price,
        sizesAvailable: document.sizesAvailable,
        itemsCount: document.itemsCount,
        category: document.category,
        images: document.images.map((imageId: string) =>
          this.storage.getFileView(BUCKET_ID, imageId)
        ),
        createdAt: document.$createdAt,
      }));

      return { products, total: response.total };
    } catch (error) {
      console.error("Error searching products:", error);
      throw new Error("Failed to search products");
    }
  }
}

export default new ProductService();
