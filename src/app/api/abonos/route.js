// src/app/api/abonos/route.js
import { NextResponse } from "next/server";
import AbonoSemanal from "@/models/AbonoSemanal.js";

// 🔹 GET /api/abonos?pacienteUuid=...
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pacienteUuid = searchParams.get("pacienteUuid");

    const abonos = pacienteUuid
      ? await AbonoSemanal.findAll({ where: { pacienteUuid } })
      : await AbonoSemanal.findAll();

    return NextResponse.json(abonos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 POST /api/abonos
export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.pacienteUuid) {
      return NextResponse.json(
        { error: "pacienteUuid es obligatorio" },
        { status: 400 }
      );
    }

    const nuevoAbono = await AbonoSemanal.create(body);
    return NextResponse.json(
      { message: "Abono registrado", data: nuevoAbono },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
