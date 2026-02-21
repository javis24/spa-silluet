

import { NextResponse } from "next/server";
import Users from "@/models/User";
import bcrypt from "bcryptjs";

// 📌 GET all users
export async function GET() {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password"] },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios", details: error.message },
      { status: 500 }
    );
  }
}

// 📌 CREATE user
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Verificar duplicado
    const existing = await Users.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Controlar roles: si no es admin, se fuerza a "pacient"
    const safeRole = ["admin", "secretary", "pacient"].includes(role)
      ? role
      : "pacient";

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role: safeRole,
    });

    // Retornar sin contraseña
    const { password: _, ...userSafe } = newUser.toJSON();

    return NextResponse.json(
      { msg: "Usuario creado exitosamente", user: userSafe },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear usuario", details: error.message },
      { status: 500 }
    );
  }
}
