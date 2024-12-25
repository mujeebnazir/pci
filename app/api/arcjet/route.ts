import arcjet, { validateEmail } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    validateEmail({
      mode: "LIVE",
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

export async function POST(req: Request) {
  const data = await req.json();
  const email = data.email;
  const decision = await aj.protect(req, {
    email,
  });
  console.log("Arcjet decision: ", decision);

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        {
          message: "Invalid email",
          reason: decision.reason,
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } else {
    return NextResponse.json({
      message: "Email is valid",
    });
  }
}
