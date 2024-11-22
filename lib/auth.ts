import client from "@/utils/appwrite";
import { Databases, Account, ID, Query } from "appwrite";

class AuthService {
  private account: Account;
  private session: any = null;
  private isLoggedIn: boolean = false;
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
  ): Promise<boolean> {
    try {
      const response = await this.account.create(
        ID.unique(),

        email,
        password
      );
      const userDoc = await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER ?? "",
        response.$id,
        {
          fullname: fullname || "",
          phone: phone || "",
          address: address || "",
        }
      );

      const userCart = await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CART as string,
        ID.unique(),
        {
          user: `${response.$id}`,
        }
      );

      if (!userDoc && !response && !userCart)
        throw new Error("User document creation failed");
      this.isLoggedIn = !!response;
      this.session = response;
      return this.isLoggedIn;
    } catch (error: any) {
      return error.message;
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );

      this.isLoggedIn = !!response;
      this.session = response;
      return this.isLoggedIn;
    } catch (error: any) {
      return false;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await this.account.deleteSession("current");
      this.isLoggedIn = false;
      this.session = null;
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
      };

      this.session = userInfo;
      this.isLoggedIn = true;

      return userInfo;
    } catch (error: any) {
      console.error("Error fetching user data:", error.message);
      this.isLoggedIn = false;
      return null;
    }
  }
}

export default new AuthService();
