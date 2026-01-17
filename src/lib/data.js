import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Users, Paciente, MetricasSalud, Cita, AbonoSemanal, TratamientosEsteticos } from "@/models/Index";

export async function getPatientWeeklyProgress() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const emailUsuario = decoded.email;

    if (!emailUsuario) return null;

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

    const p = JSON.parse(JSON.stringify(paciente));

    // ==========================================================
    // NUEVA LÓGICA: CORRECCIÓN DE SEMANAS
    // ==========================================================
    
    // 1. Ordenamos las métricas cronológicamente (de la más antigua a la nueva)
    // Así la primera que registraste será la "Semana 1", la segunda la "Semana 2", etc.
    const metricasOrdenadas = p.metricas.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const semanas = Array.from({ length: 16 }, (_, i) => {
      const numSemana = i + 1;
      
      // 2. En lugar de buscar por ID, tomamos por posición en el array
      // i = 0 es la primera métrica (Semana 1)
      // i = 1 es la segunda métrica (Semana 2)
      const metricaEncontrada = metricasOrdenadas[i] || null;
      
      // Para abonos, mantenemos tu lógica actual (si guardas el numero de semana en el string)
      const abonoEncontrado = p.abono_semanal.find(a => parseInt(a.semana) === numSemana);

      return {
        numero: numSemana,
        bloqueado: false,
        metrica: metricaEncontrada,
        abono: abonoEncontrado || null,
        status: 'pending' 
      };
    });

    // Calcular en qué semana va el paciente (basado en cuántas métricas tiene registradas)
    const metricasRegistradas = metricasOrdenadas.length;

    semanas.forEach(s => {
      // Si el número de semana es menor o igual a las que tenemos registradas, está completada
      if (s.numero <= metricasRegistradas) s.status = 'completed';
      
      // La siguiente semana es la actual
      if (s.numero === metricasRegistradas + 1) s.status = 'current';
      
      // Las posteriores están bloqueadas
      if (s.numero > metricasRegistradas + 1) s.status = 'locked';
    });

    return {
      perfil: p,
      progreso: semanas
    };

  } catch (error) {
    console.error("Error obteniendo datos del paciente:", error.message);
    return null; 
  }
}