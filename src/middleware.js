import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; 
import { cookies } from "next/headers";

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret); 
    return NextResponse.next();
  } catch (err) {
    console.error("Error al verificar token en middleware (jose):", err); 
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};