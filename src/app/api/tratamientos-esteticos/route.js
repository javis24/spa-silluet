import { NextResponse } from "next/server";
import TratamientosEsteticos from "@/models/TratamientosEsteticos";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pacienteUuid = searchParams.get("pacienteUuid");

    const tratamientos = pacienteUuid
      ? await TratamientosEsteticos.findAll({ where: { pacienteUuid } })
      : await TratamientosEsteticos.findAll();

    return NextResponse.json(tratamientos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const nuevoTratamiento = await TratamientosEsteticos.create(body);
    return NextResponse.json({ message: "Tratamiento guardado", data: nuevoTratamiento }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
