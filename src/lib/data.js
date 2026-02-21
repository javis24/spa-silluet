import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Users, Paciente, MetricasSalud, Cita, AbonoSemanal, TratamientosEsteticos } from "@/models/Index";

export async function getPatientWeeklyProgress() {
  // 1. Candado de fase de Build (Mantenlo, es perfecto)
  if (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.MYSQL_HOST) {
    return null;
  }

  try {
    // 2. En Next.js 15+, cookies() es asíncrono. 
    // Lo envolvemos en un try interno por si se llama en un contexto estático.
    let token;
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("jwt")?.value;
    } catch (e) {
      // Si cookies() falla, es que estamos en build o contexto estático
      return null;
    }

    if (!token) return null;
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return null;
    }
    
    const emailUsuario = decoded.email;
    if (!emailUsuario) return null;

    // 3. Verificación de seguridad de los modelos (evita fallos de inicialización)
    if (!Users || !Paciente) return null;

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

    // ... lógica de semanas (asegúrate que 'semanas' esté definida arriba de este return)
    
    return JSON.parse(JSON.stringify({
      perfil: paciente,
      progreso: semanas 
    }));

  } catch (error) {
    // Evitamos que el error rompa el Build, solo logueamos en Runtime
    if (process.env.NODE_ENV !== 'production') {
       console.error("Error obteniendo datos del paciente:", error.message);
    }
    return null; 
  }
}