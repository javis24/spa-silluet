export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";

// ==================== GET: Obtener un paciente ====================
export async function GET(req, { params }) {
  const { uuid } = await params; // ✅ await destructuring
  try {
    const paciente = await Paciente.findByPk(uuid);
    if (!paciente) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(paciente);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener paciente", details: error.message },
      { status: 500 }
    );
  }
}


// ==================== PUT: Actualizar paciente ====================
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const paciente = await Paciente.findByPk(params.uuid);

    if (!paciente) {
      return NextResponse.json({ error: "Paciente no encontrado" }, { status: 404 });
    }

    await paciente.update(body);

    return NextResponse.json(
      { message: "Paciente actualizado exitosamente", paciente },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==================== DELETE: Eliminar paciente ====================
export async function DELETE(req, { params }) {
  try {
    const paciente = await Paciente.findByPk(params.uuid);

    if (!paciente) {
      return NextResponse.json({ error: "Paciente no encontrado" }, { status: 404 });
    }

    await paciente.destroy();

    return NextResponse.json({ message: "Paciente eliminado exitosamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
