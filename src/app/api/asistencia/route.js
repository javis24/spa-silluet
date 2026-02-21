

import { NextResponse } from "next/server";
import { RegistroAsistencia, Users } from "../../../models/Index.js"; 

// ✅ GET: Listar registros (con usuario)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const registros = await RegistroAsistencia.findAll({
      where: userId ? { userId } : undefined,
      include: [
        {
          model: Users,
          as: "usuario", // 👈 debe coincidir con tu alias en index.js
          attributes: ["id", "name", "email", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json(registros);
  } catch (error) {
    console.error("❌ Error en GET asistencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ POST: Registrar entrada/salida
export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId requerido" }, { status: 400 });
    }

    const hoy = new Date().toISOString().split("T")[0];
    const hora = new Date().toLocaleTimeString("es-MX", { hour12: false });

    // Buscar si ya existe un registro hoy
    let registro = await RegistroAsistencia.findOne({ where: { userId, fecha: hoy } });

    if (registro) {
      if (!registro.horaSalida) {
        registro.horaSalida = hora;
        await registro.save();
        return NextResponse.json({ message: "Salida registrada", data: registro });
      }
      return NextResponse.json({ message: "Ya tiene entrada y salida hoy", data: registro });
    }

    // Crear nuevo registro
    const nuevo = await RegistroAsistencia.create({
      userId,
      fecha: hoy,
      horaEntrada: hora,
    });

    return NextResponse.json({ message: "Entrada registrada", data: nuevo }, { status: 201 });
  } catch (error) {
    console.error("❌ Error en POST asistencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ PUT: Actualizar registro manualmente
export async function PUT(req) {
  try {
    const { id, fecha, horaEntrada, horaSalida } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "id requerido" }, { status: 400 });
    }

    const registro = await RegistroAsistencia.findByPk(id);
    if (!registro) {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
    }

    await registro.update({ fecha, horaEntrada, horaSalida });
    return NextResponse.json({ message: "Registro actualizado", data: registro });
  } catch (error) {
    console.error("❌ Error en PUT asistencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE: Eliminar registro
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    const registro = await RegistroAsistencia.findByPk(id);
    if (!registro) return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });

    await registro.destroy();
    return NextResponse.json({ message: "Registro eliminado" });
  } catch (error) {
    console.error("❌ Error en DELETE asistencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
