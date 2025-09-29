// src/app/api/abonos/[id]/route.js
import { NextResponse } from "next/server";
import AbonoSemanal from "@/models/AbonoSemanal.js";

// 🔹 GET /api/abonos/:id
export async function GET(_, { params }) {
  try {
    const abono = await AbonoSemanal.findByPk(params.id);
    if (!abono) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(abono);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 PUT /api/abonos/:id
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const abono = await AbonoSemanal.findByPk(params.id);

    if (!abono) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    await abono.update(body);
    return NextResponse.json({ message: "Abono actualizado", data: abono });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 DELETE /api/abonos/:id
export async function DELETE(_, { params }) {
  try {
    const abono = await AbonoSemanal.findByPk(params.id);
    if (!abono) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    await abono.destroy();
    return NextResponse.json({ message: "Abono eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
