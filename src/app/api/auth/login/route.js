export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "@/models/User";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json({ msg: "Usuario no encontrado" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: "Contraseña incorrecta" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Guardamos cookie y devolvemos también user
    const res = NextResponse.json({
      msg: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });

   res.cookies.set("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60,
  path: "/",
});

    return res;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ msg: "Error en el servidor" }, { status: 500 });
  }
}
