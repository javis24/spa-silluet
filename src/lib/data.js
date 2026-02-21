import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
// Importante: Asegúrate que models/Index no dispare conexiones automáticas
import { Users, Paciente, MetricasSalud, Cita, AbonoSemanal, TratamientosEsteticos } from "@/models/Index";

export async function getPatientWeeklyProgress() {
  // 1. Evitar ejecución durante el build si no hay variables de entorno
  if (!process.env.MYSQL_HOST) {
    console.log("Skipping data fetch during build phase...");
    return null;
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) return null;

    // Verificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const emailUsuario = decoded.email;
    if (!emailUsuario) return null;

    // Buscar usuario y paciente
    const user = await Users.findOne({ where: { email: emailUsuario } });
    if (!user) return null;

    const paciente = await Paciente.findOne({
      where: { userId: user.id },
      include: [
        { model: MetricasSalud, as: 'metricas' },
        { model: AbonoSemanal, as: 'abono_semanal' },
        { model: Cita, as: 'citas' },
        { model: TratamientosEsteticos, as: 'tratamientos' }
      ]
    });

    if (!paciente) return null;

    // ... resto de tu lógica de procesamiento (sort, semanas, etc.)
    // El código de lógica que tienes (metricasOrdenadas, semanas.forEach) está perfecto.
    
    // Al final, asegúrate de devolver un objeto plano
    return JSON.parse(JSON.stringify({
      perfil: paciente,
      progreso: semanas // 'semanas' es el array que generas en tu código
    }));

  } catch (error) {
    console.error("Error obteniendo datos del paciente:", error.message);
    return null; 
  }
}