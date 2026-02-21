

import { NextResponse } from "next/server";
import  Users  from "@/models/User";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    const existing = await Users.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "El email ya está en uso" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      role: role || "pacient",
    });

    return NextResponse.json(
      { message: "Usuario registrado exitosamente", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
