export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NextResponse } from "next/server";
import MetricasSalud from "@/models/MetricasSalud";

// GET todas las métricas de un paciente
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pacienteUuid = searchParams.get("pacienteUuid");

    const metricas = pacienteUuid
      ? await MetricasSalud.findAll({ where: { pacienteUuid } })
      : await MetricasSalud.findAll();

    return NextResponse.json(metricas);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST crear métricas
export async function POST(req) {
  try {
    const body = await req.json();
    const nuevaMetrica = await MetricasSalud.create(body);
    return NextResponse.json({ message: "Métricas creadas", data: nuevaMetrica }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
