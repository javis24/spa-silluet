"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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
});


    doc.save(`${titulo.replaceAll(" ", "_")}.pdf`);
  };

  const handleDescargarTodo = () => {
    generarPDF(citas, "Citas_Totales");
  };

  const handleDescargarPorCliente = (pacienteUuid) => {
    const citasCliente = citas.filter((c) => c.pacienteUuid === pacienteUuid);
    if (citasCliente.length === 0)
      return alert("Este cliente no tiene citas registradas.");
    const paciente = citasCliente[0]?.paciente?.email || "Cliente";
    generarPDF(citasCliente, `Citas_de_${paciente}`);
  };

  // === RENDER ===
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200">
      <div className="flex-1 p-4 sm:p-6 relative">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-800 text-sm sm:text-base"
        >
          ← Volver a inicio
        </button>

        {/* 📄 Botón general de PDF */}
        <div className="text-center mb-6">
          <button
            onClick={handleDescargarTodo}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            📥 Descargar todas las citas en PDF
          </button>
        </div>

        {/* Formulario */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8 w-full max-w-md sm:max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 text-center">
            {editing ? "Editar Cita 📅" : "Registrar Cita 💖"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <select
              name="pacienteUuid"
              value={form.pacienteUuid}
              onChange={handleChange}
              required
              className="col-span-1 sm:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            >
              <option value="">-- Selecciona un paciente --</option>
              {pacientes.map((p) => (
                <option key={p.uuid} value={p.uuid}>
                  {p.email}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="text"
              name="servicio"
              placeholder="Servicio"
              value={form.servicio}
              onChange={handleChange}
              className="col-span-1 sm:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <textarea
              name="comentario"
              placeholder="Comentario"
              value={form.comentario}
              onChange={handleChange}
              className="col-span-1 sm:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              {editing ? "Actualizar Cita" : "Guardar Cita"}
            </button>
          </form>
        </div>

        {/* Lista de Citas */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg sm:text-2xl font-bold text-pink-600 mb-4 text-center">
            Lista de Citas
          </h2>

          {/* Buscador */}
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              placeholder="Buscar por fecha, hora, servicio o comentario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
          </div>

          {/* Tabla */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-100 text-left text-pink-500">
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Hora</th>
                  <th className="p-2">Servicio</th>
                  <th className="p-2">Comentario</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citasPaginadas.map((c) => (
                  <tr key={c.id} className="border-b text-pink-500">
                    <td className="p-2">{c.fecha}</td>
                    <td className="p-2">{c.hora}</td>
                    <td className="p-2">{c.servicio}</td>
                    <td className="p-2">{c.comentario}</td>
                    <td className="p-2">{c.paciente?.email || "Sin asignar"}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => handleDescargarPorCliente(c.pacienteUuid)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        PDF Cliente
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
