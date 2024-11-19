import client from "@/utils/appwrite";
import {Databases, Account, ID } from "appwrite";

class AuthService {
  private account: Account;
  private session: any = null;
  private isLoggedIn: boolean = false;
  private databases: Databases;

  constructor() {
    this.account = new Account(client);
    this.databases = new Databases(client);
  }

  async signUp(email: string, password: string,fullname?: string,phone?: string,address?: string): Promise<boolean> {
    try {
      const response = await this.account.create(
        ID.unique(),

        email,
        password
      );
       await this.databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER ?? "",
        response.$id,
        {
          fullname: fullname || "",
          phone: phone || "",
          address: address || "",
        }
      );
      this.isLoggedIn = !!response;
      this.session = response;
      return this.isLoggedIn;
    } catch (error: any) {
      return false;
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
  
      
      const userInfo = {
        email: user.email, 
        $id: user.$id,     
        fullname: userDoc.fullname, 
        phone: userDoc.phone,       
        address: userDoc.address,   
       
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
