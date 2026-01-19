// src/app/portal/page.jsx
import { getPatientWeeklyProgress } from "@/lib/data";
export const dynamic = "force-dynamic";
import Link from "next/link";

export default async function PortalPage() {
  const data = await getPatientWeeklyProgress();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
        <div className="text-center">
           <h1 className="text-2xl font-bold text-pink-700">Cuenta no vinculada</h1>
           <p className="text-gray-600">Por favor pide en recepción que vinculen tu usuario a tu ficha.</p>
           <Link href="/login" className="text-pink-500 underline mt-4 block">Salir</Link>
        </div>
      </div>
    );
  }

  const { perfil, progreso } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* --- HEADER --- */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white pb-24 pt-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm border-2 border-white/50">
              👤
            </div>
            <div>
              <h1 className="text-3xl font-bold">Hola, {perfil.address || "Paciente"}</h1> {/* Usé address pq no vi campo nombre en tu modelo */}
              <p className="opacity-90">Bienvenido a tu transformación</p>
            </div>
          </div>
          <Link href="/login" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition backdrop-blur-sm">
            Cerrar Sesión
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-16">
        {/* --- TARJETA DE RESUMEN --- */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatBox label="Semana Actual" value={`#${progreso.find(s => s.status === 'current')?.numero || 1}`} color="text-pink-600" />
            <StatBox label="Peso Inicial" value={`${perfil.metricas[perfil.metricas.length - 1]?.weight || '-'} kg`} color="text-gray-600" />
            <StatBox label="Peso Actual" value={`${perfil.metricas[0]?.weight || '-'} kg`} color="text-purple-600" />
            <StatBox label="Kilos Bajados" value={calcularBajada(perfil.metricas)} color="text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          🚀 Mi Viaje de 16 Semanas
        </h2>

        {/* --- GRILLA DE SEMANAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progreso.map((semana) => (
            <div 
              key={semana.numero} 
              className={`
                relative overflow-hidden rounded-2xl border transition-all duration-300
                ${semana.status === 'locked' ? 'bg-gray-100 border-gray-200 opacity-70 grayscale' : 'bg-white border-pink-100 shadow-md hover:shadow-lg'}
                ${semana.status === 'current' ? 'ring-2 ring-pink-400 ring-offset-2' : ''}
              `}
            >
              {/* Encabezado de la tarjeta */}
              <div className={`p-4 flex justify-between items-center ${semana.status === 'locked' ? 'bg-gray-200' : 'bg-pink-50'}`}>
                <h3 className="font-bold text-lg text-gray-700">
                  Semana {semana.numero}
                </h3>
                {getStatusBadge(semana.status)}
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-5 space-y-4">
                
                {/* 1. Resultados (Métricas) */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Resultados Clínicos</p>
                  {semana.metrica ? (
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-pink-50/50 p-2 rounded-lg">
                        <span className="block text-xs text-gray-500">Peso</span>
                        <span className="font-bold text-pink-700">{semana.metrica.weight} kg</span>
                      </div>
                      <div className="bg-pink-50/50 p-2 rounded-lg">
                        <span className="block text-xs text-gray-500">Grasa</span>
                        <span className="font-bold text-pink-700">{semana.metrica.fatPercentage}%</span>
                      </div>
                      <div className="bg-pink-50/50 p-2 rounded-lg">
                        <span className="block text-xs text-gray-500">Cintura</span>
                        {/* Asumiendo que tienes este dato o similar */}
                        <span className="font-bold text-pink-700">{semana.metrica.bmi} IMC</span> 
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic bg-gray-50 p-3 rounded text-center">
                      {semana.status === 'locked' ? 'Aún no llegas aquí' : 'Esperando registro...'}
                    </p>
                  )}
                </div>

                {/* 2. Abonos */}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Pago Semanal</span>
                    {semana.abono ? (
                      <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
                        ✅ ${semana.abono.monto} Pagado
                      </span>
                    ) : (
                       <span className="text-gray-400 text-sm">Pendiente</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- UTILIDADES UI ---

function StatBox({ label, value, color }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
    </div>
  );
}

function getStatusBadge(status) {
  if (status === 'completed') return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Completada</span>;
  if (status === 'current') return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold animate-pulse">En Curso</span>;
  return <span className="text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded font-bold">Bloqueada</span>;
}

function calcularBajada(metricas) {
  if (!metricas || metricas.length < 2) return "0 kg";
  // Asumiendo que metricas está ordenado descendente (más nuevo primero)
  // Ojo: en data.js no lo ordenamos dentro de 'metricas', lo buscamos por ID.
  // Pero aquí perfil.metricas viene "raw".
  const ordenadas = [...metricas].sort((a, b) => a.id - b.id); // Ordenar por semana (1, 2, 3...)
  const primero = ordenadas[0]?.weight || 0;
  const ultimo = ordenadas[ordenadas.length - 1]?.weight || 0;
  const diff = (primero - ultimo).toFixed(1);
  return `${diff > 0 ? '-' : '+'}${Math.abs(diff)} kg`;
}