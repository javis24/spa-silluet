export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies(); 
  const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return NextResponse.json({ msg: "No autorizado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      user: {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
        email: decoded.email,
      },
    });
  } catch (error) {
    console.error("Error en /api/auth/me:", error);
    return NextResponse.json({ msg: "Token inválido" }, { status: 401 });
  }
}
