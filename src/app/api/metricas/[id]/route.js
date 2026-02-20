export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NextResponse } from "next/server";
import MetricasSalud from "@/models/MetricasSalud";

// ✅ GET por ID (opcional, útil si quieres abrir modal precargado con datos desde la API)
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const metrica = await MetricasSalud.findByPk(id);
    if (!metrica) {
      return NextResponse.json({ error: "Métrica no encontrada" }, { status: 404 });
    }
    return NextResponse.json(metrica);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ PUT actualizar métricas
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const metrica = await MetricasSalud.findByPk(id);
    if (!metrica) {
      return NextResponse.json({ error: "Métrica no encontrada" }, { status: 404 });
    }

    await metrica.update(body);

    return NextResponse.json({ message: "Métrica actualizada", data: metrica });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE eliminar métricas
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const metrica = await MetricasSalud.findByPk(id);
    if (!metrica) {
      return NextResponse.json({ error: "Métrica no encontrada" }, { status: 404 });
    }

    await metrica.destroy();

    return NextResponse.json({ message: "Métrica eliminada" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
