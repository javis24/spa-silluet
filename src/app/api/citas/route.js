import { NextResponse } from "next/server";
import Cita from "@/models/Cita";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pacienteUuid = searchParams.get("pacienteUuid");

    const citas = pacienteUuid
      ? await Cita.findAll({ where: { pacienteUuid } })
      : await Cita.findAll();

    return NextResponse.json(citas);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const nuevaCita = await Cita.create(body);
    return NextResponse.json({ message: "Cita creada", data: nuevaCita }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
