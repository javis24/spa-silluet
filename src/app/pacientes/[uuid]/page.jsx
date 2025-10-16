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
  const [metricas, setMetricas] = useState([]);
  const [abonos, setAbonos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [editData, setEditData] = useState(null); // 🔹 datos a editar

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


const fetchMetricas = async () => {
  const res = await fetch(`/api/metricas?pacienteUuid=${uuid}`);
  const data = await res.json();
  setMetricas(Array.isArray(data) ? data : []); // 🔹 seguro
};

const fetchAbonos = async () => {
  const res = await fetch(`/api/abonos?pacienteUuid=${uuid}`);
  const data = await res.json();
  setAbonos(Array.isArray(data) ? data : []);
};

const fetchCitas = async () => {
  const res = await fetch(`/api/citas?pacienteUuid=${uuid}`);
  const data = await res.json();
  setCitas(Array.isArray(data) ? data : []);
};

const fetchTratamientos = async () => {
  const res = await fetch(`/api/tratamientos-esteticos?pacienteUuid=${uuid}`);
  const data = await res.json();
  setTratamientos(Array.isArray(data) ? data : []);
};


  // Guardar / actualizar
  const handleSave = async (endpoint, body, id = null) => {
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/${endpoint}/${id}` : `/api/${endpoint}`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, pacienteUuid: uuid }),
    });
    const data = await res.json();
    alert(data.message || data.error);

    setShowModal(null);
    setEditData(null);

    if (endpoint === "metricas") fetchMetricas();
    if (endpoint === "abonos") fetchAbonos();
    if (endpoint === "citas") fetchCitas();
    if (endpoint === "tratamientos-esteticos") fetchTratamientos();
  };

  const handleEdit = (endpoint, item) => {
    setEditData(item); // guardamos datos a editar
    setShowModal(endpoint);
  };

  const handleDelete = async (endpoint, id) => {
    if (!confirm("¿Seguro que deseas eliminar este registro?")) return;
    await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
    if (endpoint === "metricas") fetchMetricas();
    if (endpoint === "abonos") fetchAbonos();
    if (endpoint === "citas") fetchCitas();
    if (endpoint === "tratamientos-esteticos") fetchTratamientos();
  };

  const handleExport = (item) => {
    alert("Exportar a PDF: " + JSON.stringify(item, null, 2));
    window.print();
  };

  // Traducciones de campos
  const labels = {
    id: "semana",
    weight: "Peso (kg)",
    fatPercentage: "Grasa Corporal (%)",
    muscleKg: "Músculo (kg)",
    bodyWater: "Agua Corporal (%)",
    bmi: "IMC",
    metabolicAge: "Edad Metabólica",
    heartRate: "Ritmo Cardíaco",
    monto: "Monto ($)",
    semana: "Semana",
    fechaAbono: "Fecha de Abono",
    fecha: "Fecha",
    hora: "Hora",
    servicio: "Servicio",
    cavitation: "Cavitación",
    radioFrequency: "Radiofrecuencia",
    lipoLaser: "Lipo Láser",
  };

   const handleExportPDF = async () => {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(200, 0, 100);
  doc.text("Clínica de Belleza SiluettePlus", 105, 15, { align: "center" });

  if (paciente) {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Paciente: ${paciente.nombre}`, 14, 30);
    doc.text(`Correo: ${paciente.email}`, 14, 38);
    doc.text(`Teléfono: ${paciente.phoneNumber}`, 14, 46);
    doc.text(`Edad: ${paciente.age}`, 14, 54);
    doc.text(`Estatura: ${paciente.height} m`, 14, 62);
  }

  let yOffset = 75;

  if (metricas.length > 0) {
    autoTable(doc, {
      startY: yOffset,
      head: [["Semana", "Peso", "Grasa %", "Músculo", "IMC"]],
      body: metricas.map(m => [
        m.id, m.weight, m.fatPercentage, m.muscleKg, m.bmi
      ]),
    });
    yOffset = doc.lastAutoTable.finalY + 10;
  }

  if (abonos.length > 0) {
    autoTable(doc, {
      startY: yOffset,
      head: [["Monto", "Semana", "Fecha"]],
      body: abonos.map(a => [
        `$${a.monto}`, a.semana, a.fechaAbono
      ]),
    });
    yOffset = doc.lastAutoTable.finalY + 10;
  }

  if (citas.length > 0) {
    autoTable(doc, {
      startY: yOffset,
      head: [["ID", "Fecha", "Hora", "Servicio"]],
      body: citas.map(c => [
        c.id, c.fecha, c.hora, c.servicio
      ]),
    });
    yOffset = doc.lastAutoTable.finalY + 10;
  }

  if (tratamientos.length > 0) {
    autoTable(doc, {
      startY: yOffset,
      head: [["ID", "Cavitación", "Radiofrecuencia", "Lipo Láser"]],
      body: tratamientos.map(t => [
        t.id, t.cavitation, t.radioFrequency, t.lipoLaser
      ]),
    });
  }

  doc.save(`Historial_${paciente?.nombre || "paciente"}.pdf`);
};

const router = useRouter();


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
                Historial de {paciente.nombre}
              </h1>
              <p><strong>Correo:</strong> {paciente.email}</p>
              <p><strong>Dirección:</strong> {paciente.address}</p>
              <p><strong>Teléfono:</strong> {paciente.phoneNumber}</p>
              <p><strong>Edad:</strong> {paciente.age}</p>
              <p><strong>Estatura:</strong> {paciente.height} m</p>
            </div>
          )}


        {/* 📊 Secciones */}
        <Section
          title="📊 Métricas de Salud"
          data={metricas}
          fields={["id","weight", "fatPercentage", "muscleKg", "bmi"]}
          labels={labels}
          endpoint="metricas"
          onAdd={() => setShowModal("metricas")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
          onExportPDF={handleExportPDF} 
        />

        <Section
          title="💳 Abonos Semanales"
          data={abonos}
          fields={["monto", "semana", "fechaAbono"]}
          labels={labels}
          endpoint="abonos"
          onAdd={() => setShowModal("abonos")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />

        <Section
          title="🗓️ Citas"
          data={citas}
          fields={["id","fecha", "hora", "servicio"]}
          labels={labels}
          endpoint="citas"
          onAdd={() => setShowModal("citas")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />

      <Section
        title="💆 Tratamientos Estéticos"
        data={tratamientos}
        fields={["id","cavitation", "radioFrequency", "lipoLaser"]}
        labels={labels}
        endpoint="tratamientos-esteticos"  
        onAdd={() => setShowModal("tratamientos-esteticos")}
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


function Section({ title, data, fields, labels, endpoint, onAdd, onEdit, onDelete, onExport }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-pink-600">{title}</h2>
        <button
          onClick={onAdd}
          className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm sm:text-base"
        >
          + Agregar
        </button>
      </div>

      {/* Vista mobile → tarjetas */}
      <div className="block sm:hidden space-y-3">
        {data.map((d, i) => (
          <div key={i} className="border rounded-lg p-3 text-pink-700 shadow-sm">
            {fields.map((f) => (
              <p key={f} className="text-sm">
                <span className="font-semibold">{labels[f] || f}:</span> {d[f]}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => onEdit(endpoint, d)}
                className="flex-1 px-3 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(endpoint, d.id || d.uuid)}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Eliminar
              </button>
              <button
                onClick={() => onExport(d)}
                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Vista escritorio → tabla */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse text-center text-sm sm:text-base">
          <thead>
            <tr className="bg-pink-100 text-pink-600">
              {fields.map((f) => (
                <th key={f} className="p-2">{labels[f] || f}</th>
              ))}
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i} className="border-b text-pink-700">
                {fields.map((f) => (
                  <td key={f} className="p-2">{d[f]}</td>
                ))}
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(endpoint, d)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(endpoint, d.id || d.uuid)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => onExport(d)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

