import client from "@/utils/appwrite";
import { Databases } from "appwrite";
import AuthService from "./auth";

class UserService {
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

  async updateProfile(fullname?: string, phone?: string, address?: string) {
    try {
      const user = await this.getCurrentUser();

      const response = await this.databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER as string,
        user.$id,
        {
          fullname,
          phone,
          address,
        }
      );

      return response; // Return the updated document if needed
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Profile update failed");
    }
  }

  /**
   * Delete the user profile
   */
  async deleteProfile() {
    try {
      const user = await this.getCurrentUser();

      await this.databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER as string,
        user.$id
      );

      // Delete the current session
      await AuthService.logout();

      return true;
    } catch (error) {
      console.error("Error deleting profile:", error);
      throw new Error("Profile deletion failed");
    }
  }
}

export default new UserService();
