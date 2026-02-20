export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';


import { NextResponse } from "next/server";
import Cita from "@/models/Cita";

// GET una cita por ID
export async function GET(_, { params }) {
  try {
    const cita = await Cita.findByPk(params.id);
    if (!cita) return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    return NextResponse.json(cita);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT actualizar cita
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const cita = await Cita.findByPk(params.id);
    if (!cita) return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });

    await cita.update(body);
    return NextResponse.json({ message: "Cita actualizada", data: cita });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE eliminar cita
export async function DELETE(_, { params }) {
  try {
    const cita = await Cita.findByPk(params.id);
    if (!cita) return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });

    await cita.destroy();
    return NextResponse.json({ message: "Cita eliminada" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
