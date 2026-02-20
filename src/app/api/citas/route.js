export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NextResponse } from "next/server";
import { Cita, Paciente } from "../../../models/Index.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pacienteUuid = searchParams.get("pacienteUuid");

    const where = pacienteUuid ? { pacienteUuid } : undefined;

   const citas = await Cita.findAll({
  where,
  include: [
    {
      model: Paciente,
      as: "paciente",   
      attributes: ["uuid", "email", "address", "phoneNumber", "age"],
    },
  ],
  order: [["fecha", "DESC"], ["hora", "DESC"]],
});


    return NextResponse.json(citas);
  } catch (error) {
    console.error("❌ Error en GET /api/citas:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const nuevaCita = await Cita.create(body);
    return NextResponse.json(
      { message: "Cita creada", data: nuevaCita },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error en POST /api/citas:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
