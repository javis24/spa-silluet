"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- ICONOS SVG PARA UI ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);
const PDFIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export default function CitasPage() {
  const [form, setForm] = useState({
    pacienteUuid: "",
    fecha: "",
    hora: "",
    servicio: "",
    comentario: "",
  });
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const router = useRouter();

  useEffect(() => {
    fetchCitas();
    fetchPacientes();
  }, []);

  const fetchCitas = async () => {
    const res = await fetch("/api/citas");
    const data = await res.json();
    const ordenadas = (Array.isArray(data) ? data : []).sort((a, b) => {
      const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
      const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
      return fechaHoraB - fechaHoraA;
    });
    setCitas(ordenadas);
  };

  const fetchPacientes = async () => {
    const res = await fetch("/api/pacientes");
    const data = await res.json();
    setPacientes(Array.isArray(data) ? data : []);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/citas/${editing}` : "/api/citas";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || data.error);

    setForm({
      pacienteUuid: "",
      fecha: "",
      hora: "",
      servicio: "",
      comentario: "",
    });
    setEditing(null);
    fetchCitas();
  };

  const handleEdit = (cita) => {
    setForm({
      pacienteUuid: cita.pacienteUuid,
      fecha: cita.fecha,
      hora: cita.hora,
      servicio: cita.servicio || "",
      comentario: cita.comentario || "",
    });
    setEditing(cita.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta cita?")) return;
    const res = await fetch(`/api/citas/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message || data.error);
    fetchCitas();
  };

  const citasFiltradas = citas.filter(
    (c) =>
      c.fecha?.toLowerCase().includes(search.toLowerCase()) ||
      c.hora?.toLowerCase().includes(search.toLowerCase()) ||
      c.servicio?.toLowerCase().includes(search.toLowerCase()) ||
      c.comentario?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(citasFiltradas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const citasPaginadas = citasFiltradas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // 📄 === FUNCIONES PDF ===
  const generarPDF = (lista, titulo = "Citas Registradas") => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(219, 39, 119); // Pink-600 color
    doc.text(titulo, 14, 15);

    const tableColumn = ["Fecha", "Hora", "Servicio", "Comentario", "Paciente"];
    const tableRows = [];

    lista.forEach((c) => {
      tableRows.push([
        c.fecha,
        c.hora,
        c.servicio,
        c.comentario,
        c.paciente?.email || "Sin asignar",
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      headStyles: { fillColor: [219, 39, 119] }, // Pink headers
    });

    doc.save(`${titulo.replaceAll(" ", "_")}.pdf`);
  };

  const handleDescargarTodo = () => generarPDF(citas, "Citas_Totales");
  
  const handleDescargarPorCliente = (pacienteUuid) => {
    const citasCliente = citas.filter((c) => c.pacienteUuid === pacienteUuid);
    if (citasCliente.length === 0)
      return alert("Este cliente no tiene citas registradas.");
    const paciente = citasCliente[0]?.paciente?.email || "Cliente";
    generarPDF(citasCliente, `Citas_de_${paciente}`);
  };

  // === RENDER MEJORADO ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-purple-200 p-4 sm:p-8">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-white text-pink-600 rounded-full shadow hover:bg-pink-50 transition font-medium"
          >
            ← Volver
          </button>
          <h1 className="text-3xl font-bold text-pink-700 tracking-tight">
            Gestión de Citas
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* === COLUMNA IZQUIERDA: FORMULARIO (Sticky en Desktop) === */}
        <div className="lg:col-span-4 h-fit">
          <div className="bg-white rounded-3xl shadow-xl p-6 border-t-4 border-pink-400 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {editing ? "✏️ Editar Cita" : "✨ Nueva Cita"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Paciente */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Paciente</label>
                <select
                  name="pacienteUuid"
                  value={form.pacienteUuid}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition outline-none text-black"
                >
                  <option value="">-- Seleccionar --</option>
                  {pacientes.map((p) => (
                    <option key={p.uuid} value={p.uuid}>
                      {p.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha y Hora en Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    required
                    className="text-black w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    value={form.hora}
                    onChange={handleChange}
                    required
                    className="text-black w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Servicio */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Servicio</label>
                <input
                  type="text"
                  name="servicio"
                  placeholder="Ej. Limpieza Facial"
                  value={form.servicio}
                  onChange={handleChange}
                  className="text-black w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              {/* Comentario */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Notas / Comentarios</label>
                <textarea
                  name="comentario"
                  placeholder="Detalles adicionales..."
                  rows="3"
                  value={form.comentario}
                  onChange={handleChange}
                  className="text-black w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none resize-none"
                />
              </div>

              {/* Botones del Formulario */}
              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95"
                >
                  {editing ? "Actualizar" : "Guardar Cita"}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => { setEditing(null); setForm({ pacienteUuid: "", fecha: "", hora: "", servicio: "", comentario: "" }); }}
                    className="px-4 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 font-medium"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* === COLUMNA DERECHA: LISTADO === */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Barra de Herramientas (Buscador + Exportar) */}
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center border border-white/50">
            <div className="relative w-full sm:w-2/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Buscar por cliente, servicio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-gray-700"
              />
            </div>
            <button
              onClick={handleDescargarTodo}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow font-medium transition text-sm whitespace-nowrap"
            >
              <PDFIcon /> Reporte General
            </button>
          </div>

          {/* Tabla de Citas */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-pink-50 text-pink-700 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Fecha / Hora</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Servicio</th>
                    <th className="p-4">Nota</th>
                    <th className="p-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {citasPaginadas.length > 0 ? (
                    citasPaginadas.map((c) => (
                      <tr key={c.id} className="hover:bg-pink-50/30 transition duration-150">
                        <td className="p-4 whitespace-nowrap">
                          <div className="font-bold text-gray-800">{c.fecha}</div>
                          <div className="text-xs text-pink-500 font-medium">{c.hora}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-gray-700 truncate max-w-[150px]" title={c.paciente?.email}>
                            {c.paciente?.email || "No asignado"}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-md">
                            {c.servicio || "General"}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500 max-w-[200px] truncate">
                          {c.comentario || "-"}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(c)}
                              title="Editar"
                              className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDescargarPorCliente(c.pacienteUuid)}
                              title="Descargar PDF Cliente"
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                            >
                              <PDFIcon />
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              title="Eliminar"
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-400 italic">
                        No se encontraron citas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación Limpia */}
            {totalPages > 1 && (
              <div className="p-4 flex justify-center gap-2 bg-gray-50 border-t border-gray-100">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition ${
                      currentPage === i + 1
                        ? "bg-pink-500 text-white shadow-md scale-110"
                        : "bg-white text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}