import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const token = await new SignJWT(body)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  cookies().set({
    name: "access_token",
    value: token,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });

  return NextResponse.json({ success: true, message: "Token created" });
};
