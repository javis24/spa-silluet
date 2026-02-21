

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import TratamientosEsteticos from "@/models/TratamientosEsteticos";

export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // 👈 await aquí
    const tratamiento = await TratamientosEsteticos.findByPk(id);

    if (!tratamiento) {
      return NextResponse.json({ error: "Tratamiento no encontrado" }, { status: 404 });
    }

    await tratamiento.destroy();
    return NextResponse.json({ message: "Tratamiento eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req, context) {
  try {
    const { id } = await context.params; // 👈 await aquí también
    const tratamiento = await TratamientosEsteticos.findByPk(id);

    if (!tratamiento) {
      return NextResponse.json({ error: "Tratamiento no encontrado" }, { status: 404 });
    }

    return NextResponse.json(tratamiento);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params; // 👈 await aquí también
    const body = await req.json();

    const tratamiento = await TratamientosEsteticos.findByPk(id);
    if (!tratamiento) {
      return NextResponse.json({ error: "Tratamiento no encontrado" }, { status: 404 });
    }

    await tratamiento.update(body);
    return NextResponse.json({ message: "Tratamiento actualizado", data: tratamiento });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
