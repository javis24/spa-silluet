import { NextResponse } from "next/server";
import Users from "@/models/User";

// GET user by id
export async function GET(_, { params }) {
  try {
    const user = await Users.findByPk(params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE user
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const user = await Users.findByPk(params.id);
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    await user.update(body);
    return NextResponse.json({ message: "Usuario actualizado", user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(_, { params }) {
  try {
    const user = await Users.findByPk(params.id);
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }
    await user.destroy();
    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
