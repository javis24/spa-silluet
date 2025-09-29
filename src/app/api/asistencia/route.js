import { NextResponse } from "next/server";
import RegistroAsistencia from "@/models/RegistroAsistencia";
import { Users } from "@/models/Index"; 

// ✅ GET: Listar registros de asistencia
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const registros = userId
      ? await RegistroAsistencia.findAll({ where: { userId } })
      : await RegistroAsistencia.findAll();

    return NextResponse.json(registros);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ POST: Registrar entrada
export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId requerido" }, { status: 400 });
    }

    const hoy = new Date().toISOString().split("T")[0];
    const hora = new Date().toLocaleTimeString("es-MX", { hour12: false });

    // Verificar si ya hay registro hoy
    let registro = await RegistroAsistencia.findOne({ where: { userId, fecha: hoy } });

    if (registro) {
      // 🔹 Si ya existe, registrar horaSalida
      if (!registro.horaSalida) {
        registro.horaSalida = hora;
        await registro.save();
        return NextResponse.json({ message: "Salida registrada", data: registro });
      }
      return NextResponse.json({ message: "Ya tiene entrada y salida hoy", data: registro });
    }

    // 🔹 Crear nuevo registro con horaEntrada
    const nuevo = await RegistroAsistencia.create({
      userId,
      fecha: hoy,
      horaEntrada: hora,
    });

    return NextResponse.json({ message: "Entrada registrada", data: nuevo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE: Borrar un registro (solo si admin lo necesita)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    await RegistroAsistencia.destroy({ where: { id } });
    return NextResponse.json({ message: "Registro eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
