import client from "@/utils/appwrite";
import { Account, ID } from "appwrite";

class AuthService {
  private account: Account;
  private session: any = null;
  private isLoggedIn: boolean = false;

  constructor() {
    this.account = new Account(client);
  }

  async signUp(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.account.create(
        ID.unique(),

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
      if (user) {
        this.session = user;
        this.isLoggedIn = true;
        return user;
      } else {
        this.isLoggedIn = false;
        return null;
      }
    } catch (error: any) {
      return null;
    }
  }
}

export default new AuthService();
