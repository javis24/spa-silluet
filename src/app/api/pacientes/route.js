import { NextResponse } from "next/server";
import Paciente from "@/models/Paciente";

// ==================== GET: Todos los pacientes ====================
export async function GET() {
  try {
    const pacientes = await Paciente.findAll();
    return NextResponse.json(pacientes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==================== POST: Crear paciente ====================
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      address,
      phoneNumber,
      email,
      evaluationDate,
      age,
      height,
      unwantedGain,
      pathologies,
      userId,
    } = body;

    const paciente = await Paciente.create({
      address,
      phoneNumber,
      email,
      evaluationDate,
      age,
      height,
      unwantedGain,
      pathologies,
      lastActive: new Date(),
      userId,
    });

    return NextResponse.json(
      { message: "Paciente creado exitosamente", paciente },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
