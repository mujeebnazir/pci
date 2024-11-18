import client from "@/utils/appwrite";
import { Account, Databases, ID } from "appwrite";
import AuthService from "./auth";
const DATABASE_ID = "your_database_id";
const COLLECTION_ID = "your_collection_id";

class UserService {
  private user: any;
  private databases: Databases;

  constructor() {
    this.user = AuthService.getCurrentUser();
    this.databases = new Databases(client);
  }

  async getProfile() {
    try {
      const user = this.user;
      const profile = await this.databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        user.$id
      );
      return { ...user, ...profile };
    } catch (error) {
      throw new Error("Could not retrieve profile");
    }
  }

  async updateProfile(
    name: string,
    email: string,
    phone: string,
    address: string
  ) {
    try {
      const user = this.user;

      // Update the custom collection document
      await this.databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        user.$id,
        {
          name,
          email,
          phone,
          address,
        }
      );

      return { name, email, phone, address };
    } catch (error) {
      throw new Error("Profile update failed");
    }
  }

  async deleteProfile() {
    try {
      const user = this.user;

      await this.databases.deleteDocument(DATABASE_ID, COLLECTION_ID, user.$id);

      await this.user.deleteSession("current");

      return true;
    } catch (error) {
      throw new Error("Profile deletion failed");
    }
  }
}

export default new UserService();
