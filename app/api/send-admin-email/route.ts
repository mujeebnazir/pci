import { NextRequest, NextResponse } from "next/server";
import { sendAdminEmail } from "@/utils/sendAdminEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order } = body;

    if (!order) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sendAdminEmail({ order });

    return NextResponse.json(response, {
      status: response.success ? 200 : 500,
    });
  } catch (error) {
    console.error("Error processing invoice request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
