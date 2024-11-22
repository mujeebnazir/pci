import { Databases, ID, Account } from "appwrite";
import client from "@/utils/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const CATEGORY_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CATEGORY ?? "";

class CategoryService {
  private database: Databases;
  private account: Account;

  constructor() {
    this.account = new Account(client);
    this.database = new Databases(client);
  }

  /**
   * Creates a new category.
   * @param {string} name - The name of the category.
   * @returns {Promise<any>} - The created category document.
   */

  async createCategory(name: string): Promise<any> {
    if (!name) {
      throw new Error("Category name is required");
    }
    try {
      const response = await this.database.createDocument(
        DATABASE_ID,
        CATEGORY_COLLECTION_ID,
        ID.unique(),
        { name: name }
      );

      return response;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Failed to create category");
    }
  }

  /**
   * Fetches all categories.
   * @returns {Promise<any[]>} - An array of category documents.
   */
  async getCategories(): Promise<any[]> {
    try {
      const response = await this.database.listDocuments(
        DATABASE_ID,
        CATEGORY_COLLECTION_ID
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }

  /**
   * deletes a category
   * @param {string} id - The ID of the category to delete.
   * @returns {Promise<any>} - The deleted category document.
   */

  async deleteCategory(id: string) {
    if (!id) {
      throw new Error("Category id is required");
    }
    try {
      const response = await this.database.deleteDocument(
        DATABASE_ID,
        CATEGORY_COLLECTION_ID,
        id
      );
      return response;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Failed to delete category");
    }
  }
}

export default new CategoryService();
