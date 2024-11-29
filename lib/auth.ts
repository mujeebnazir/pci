import client from "@/utils/appwrite";
import { Databases, Account, ID, Query } from "appwrite";

class AuthService {
  private account: Account;
  private databases: Databases;

  constructor() {
    this.account = new Account(client);
    this.databases = new Databases(client);
  }

  async signUp(
    email: string,
    password: string,
    fullname?: string,
    phone?: string,
    address?: string
  ): Promise<{ success: boolean; message?: string; session?: any }> {
    try {
      // Check if the email already exists
      const isEmailExist = await this.databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER as string,
        [Query.equal("email", email)]
      );
  
      console.log("Email check result:", isEmailExist);
  
      if (isEmailExist.total > 0) {
        return {
          success: false,
          message: "Email already exists",
        };
      }
  
      // Create the account in Appwrite
      const response = await this.account.create(ID.unique(), email, password);
  
      // Add additional user details in the database
      const userDoc = await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER ?? "",
        response.$id,
        {
          fullname: fullname || "",
          phone: phone || "",
          address: address || "",
          email: email,
        }
      );
  
      // Create a user cart
      const userCart = await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART as string,
        ID.unique(),
        {
          user: `${response.$id}`,
        }
      );
  
      if (!userDoc || !response || !userCart) {
        return {
          success: false,
          message: "User document creation failed",
        };
      }
  
      // Return success
      return {
        success: true,
        session: response,
      };
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
  
      // Return error details
      return {
        success: false,
        message: error.message || "An unknown error occurred",
      };
    }
  }
  

  async signIn(
    email: string,
    password: string
  ): Promise<{ account?: any; session?: any }> {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      const account = await this.account.get();
      return { account, session: response };
    } catch (error: any) {
      return { account: null, session: null };
    }
  }

  async logout(): Promise<boolean> {
    try {
      await this.account.deleteSession("current");
      return true;
    } catch (error: any) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      const userDoc = await this.databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER ?? "",
        user.$id
      );
      const userCart = await this.databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART as string,
        [Query.equal("user", `${user.$id}`)]
      );

      const userInfo = {
        email: user.email,
        $id: user.$id,
        fullname: userDoc.fullname,
        phone: userDoc.phone,
        address: userDoc.address,
        cartId: userCart.documents[0].$id,
        label: user.labels,
      };
      return userInfo;
    } catch (error: any) {
         return null;
    }
  }
}

export default new AuthService();
