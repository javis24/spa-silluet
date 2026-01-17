"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import MetricasForm from "@/components/forms/MetricasForm";
import AbonoForm from "@/components/forms/AbonoForm";
import CitaForm from "@/components/forms/CitaForm";
import TratamientoForm from "@/components/forms/TratamientoForm";

export default function PacienteHistorial() {
  const { uuid } = useParams();
  const [paciente, setPaciente] = useState(null);
  
  // Estados para las listas
  const [metricas, setMetricas] = useState([]);
  const [abonos, setAbonos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  
  // Estados para modales
  const [showModal, setShowModal] = useState(null);
  const [editData, setEditData] = useState(null); 

  useEffect(() => {
    if (uuid) {
      fetchPaciente();
      fetchMetricas();
      fetchAbonos();
      fetchCitas();
      fetchTratamientos();
    }
  }, [uuid]);

  const fetchPaciente = async () => {
    const res = await fetch(`/api/pacientes/${uuid}`);
    const data = await res.json();
    setPaciente(data);
  };

  // 🔹 CORRECCIÓN: Ordenamos los datos (descendente) para ver la última semana primero
  const fetchMetricas = async () => {
    const res = await fetch(`/api/metricas?pacienteUuid=${uuid}`);
    const data = await res.json();
    const lista = Array.isArray(data) ? data : [];
    setMetricas(lista.sort((a, b) => b.id - a.id)); 
  };

  const fetchAbonos = async () => {
    const res = await fetch(`/api/abonos?pacienteUuid=${uuid}`);
    const data = await res.json();
    const lista = Array.isArray(data) ? data : [];
    setAbonos(lista.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const fetchCitas = async () => {
    const res = await fetch(`/api/citas?pacienteUuid=${uuid}`);
    const data = await res.json();
    const lista = Array.isArray(data) ? data : [];
    setCitas(lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
  };

  const fetchTratamientos = async () => {
    const res = await fetch(`/api/tratamientos-esteticos?pacienteUuid=${uuid}`);
    const data = await res.json();
    const lista = Array.isArray(data) ? data : [];
    setTratamientos(lista.sort((a, b) => b.id - a.id));
  };

  // Guardar / actualizar
  const handleSave = async (endpoint, body, id = null) => {
    // Si hay ID es PUT (Editar), si no es POST (Crear nuevo historial)
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/${endpoint}/${id}` : `/api/${endpoint}`;
    
    try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, pacienteUuid: uuid }),
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || "Error al guardar");

        alert("Guardado correctamente");

        setShowModal(null);
        setEditData(null); // Limpiamos los datos editados

        // Recargamos la lista correspondiente para ver el historial nuevo
        if (endpoint === "metricas") fetchMetricas();
        if (endpoint === "abonos") fetchAbonos();
        if (endpoint === "citas") fetchCitas();
        if (endpoint === "tratamientos-esteticos") fetchTratamientos();
    } catch (error) {
        alert(error.message);
    }
  };

  // Abrir modal para EDITAR
  const handleEdit = (endpoint, item) => {
    setEditData(item); 
    setShowModal(endpoint);
  };

  // 🔹 CORRECCIÓN: Abrir modal para CREAR (Limpiamos editData explícitamente)
  const handleAdd = (endpoint) => {
    setEditData(null); // ¡Esto es clave! Asegura que el formulario esté vacío y sin ID
    setShowModal(endpoint);
  }

  const handleDelete = async (endpoint, id) => {
    if (!confirm("¿Seguro que deseas eliminar este registro del historial?")) return;
    await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
    if (endpoint === "metricas") fetchMetricas();
    if (endpoint === "abonos") fetchAbonos();
    if (endpoint === "citas") fetchCitas();
    if (endpoint === "tratamientos-esteticos") fetchTratamientos();
  };

  const handleExport = (item) => { /* ... tu lógica de exportar ... */ };
  const handleExportPDF = async () => { /* ... tu lógica de PDF ... */ };

  const router = useRouter();

  // Traducciones de campos
  const labels = {
    id: "Semana ID", // Ojo: Usar el ID como Semana es arriesgado, pero lo mantengo por tu diseño
    weight: "Peso (kg)",
    fatPercentage: "Grasa (%)",
    muscleKg: "Músculo (kg)",
    bmi: "IMC",
    monto: "Monto ($)",
    semana: "No. Semana",
    fechaAbono: "Fecha",
    fecha: "Fecha Cita",
    hora: "Hora",
    servicio: "Servicio",
    cavitation: "Cavitación",
    radioFrequency: "Radiofrecuencia",
    lipoLaser: "Lipo Láser",
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200">  
      <div className="flex-1 p-6">
      {paciente && (
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-pink-600">
              <button
                onClick={() => router.push("/pacientes")}
                className="mb-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-800 text-sm sm:text-base"
              >
                ← Volver a Pacientes
              </button>

              <h1 className="text-2xl font-bold mb-4">
                Historial Clínico: {paciente.nombre}
              </h1>
              {/* Datos del paciente... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p><strong>📧 Correo:</strong> {paciente.email}</p>
                  <p><strong>📍 Dirección:</strong> {paciente.address}</p>
                  <p><strong>📞 Teléfono:</strong> {paciente.phoneNumber}</p>
                  <p><strong>🎂 Edad:</strong> {paciente.age} años</p>
              </div>
            </div>
          )}


        {/* 📊 Secciones - Ahora pasamos handleAdd en lugar de la función inline */}
        <Section
          title="📊 Historial de Métricas"
          data={metricas}
          fields={["id","weight", "fatPercentage", "muscleKg", "bmi"]}
          labels={labels}
          endpoint="metricas"
          onAdd={() => handleAdd("metricas")} // Usamos la función corregida
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />

        <Section
          title="💳 Historial de Abonos"
          data={abonos}
          fields={["monto", "semana", "fechaAbono"]}
          labels={labels}
          endpoint="abonos"
          onAdd={() => handleAdd("abonos")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />

        <Section
          title="🗓️ Historial de Citas"
          data={citas}
          fields={["fecha", "hora", "servicio"]}
          labels={labels}
          endpoint="citas"
          onAdd={() => handleAdd("citas")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />

        <Section
          title="💆 Tratamientos Realizados"
          data={tratamientos}
          fields={["id","cavitation", "radioFrequency", "lipoLaser"]}
          labels={labels}
          endpoint="tratamientos-esteticos"  
          onAdd={() => handleAdd("tratamientos-esteticos")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />

        {/* 🔹 Modales con edición */}
        {showModal === "metricas" && (
          <MetricasForm
            pacienteUuid={uuid}
            onClose={() => { setShowModal(null); setEditData(null); }}
            onSave={handleSave}
            initialData={editData}
          />
        )}
        {showModal === "abonos" && (
          <AbonoForm
            pacienteUuid={uuid}
            onClose={() => { setShowModal(null); setEditData(null); }}
            onSave={handleSave}
            initialData={editData}
          />
        )}
        {showModal === "citas" && (
          <CitaForm
            pacienteUuid={uuid}
            onClose={() => { setShowModal(null); setEditData(null); }}
            onSave={handleSave}
            initialData={editData}
          />
        )}
        {showModal === "tratamientos-esteticos" && (
          <TratamientoForm
            pacienteUuid={uuid}
            onClose={() => { setShowModal(null); setEditData(null); }}
            onSave={handleSave}
            initialData={editData}
          />
        )}
      </div>
    </div>
  );
}

// Componente visual (sin cambios de diseño, solo lógica interna de botones)
function Section({ title, data, fields, labels, endpoint, onAdd, onEdit, onDelete, onExport }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-6 border-l-4 border-pink-400">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-pink-600 flex items-center gap-2">
            {title} <span className="text-sm font-normal text-gray-400">({data.length} registros)</span>
        </h2>
        <button
          onClick={onAdd}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition text-sm font-bold"
        >
          + Agregar Nuevo
        </button>
      </div>

      {data.length === 0 ? (
          <p className="text-gray-400 text-center py-4 italic">No hay historial registrado aún.</p>
      ) : (
        <>
            {/* Mobile View */}
            <div className="block sm:hidden space-y-3">
                {data.map((d, i) => (
                <div key={i} className="border border-pink-100 bg-pink-50/50 rounded-lg p-3 text-pink-700 shadow-sm">
                    {fields.map((f) => (
                    <p key={f} className="text-sm">
                        <span className="font-semibold text-pink-800">{labels[f] || f}:</span> {d[f]}
                    </p>
                    ))}
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-pink-200">
                    <button onClick={() => onEdit(endpoint, d)} className="flex-1 px-3 py-1 bg-yellow-400 text-white rounded text-xs">Editar</button>
                    <button onClick={() => onDelete(endpoint, d.id || d.uuid)} className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-xs">Eliminar</button>
                    </div>
                </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm sm:text-base">
                <thead>
                    <tr className="bg-pink-50 text-pink-600 border-b border-pink-200">
                    {fields.map((f) => (
                        <th key={f} className="p-3 font-bold">{labels[f] || f}</th>
                    ))}
                    <th className="p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-pink-50 transition text-gray-700">
                        {fields.map((f) => (
                        <td key={f} className="p-3">{d[f]}</td>
                        ))}
                        <td className="p-3 flex gap-2 justify-center">
                        <button onClick={() => onEdit(endpoint, d)} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm">✏️</button>
                        <button onClick={() => onDelete(endpoint, d.id || d.uuid)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">🗑️</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </>
      )}
    </div>
  );
}