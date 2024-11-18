// app/api/auth/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Account, ID } from "appwrite";
import client from "@/utils/appwrite";
// Initialize Appwrite client

const account = new Account(client);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, type } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    if (type === "signup") {
      // Signup logic
      const response = await account.create(ID.unique(), email, password);
      console.log("Signup response:", response);
      return NextResponse.json(
        {
          message: "User signed up successfully",
          data: response,
          success: true,
        },
        { status: 200 }
      );
    } else if (type === "login") {
      // Login logic
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Login response:", response);
      return NextResponse.json(
        {
          message: "User logged in successfully",
          session: response,
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid request type" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
