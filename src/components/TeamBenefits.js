"use client";

const leftItems = [
  {
    title: "Tratamientos Faciales",
    icon: "🌸",
    description:
      "Cuidamos tu piel con productos naturales y técnicas que devuelven la frescura y luminosidad a tu rostro.",
  },
  {
    title: "Masajes Relajantes",
    icon: "💆‍♀️",
    description:
      "Libérate del estrés con nuestros masajes corporales que equilibran cuerpo y mente.",
  },
  {
    title: "Limpieza Facial Profunda",
    icon: "🧖‍♀️",
    description:
      "Elimina impurezas y revitaliza tu piel con un tratamiento profesional y personalizado.",
  },
  {
    title: "Depilación con Cera",
    icon: "🕯️",
    description:
      "Piel suave y sin vello con nuestras técnicas seguras y efectivas para todo tipo de piel.",
  },
];

const rightItems = [
  {
    title: "Baño de Vapor",
    icon: "🛁",
    description:
      "Relaja tu cuerpo y mejora la circulación en un ambiente cálido y purificador.",
  },
  {
    title: "Radiofrecuencia Corporal",
    icon: "💫",
    description:
      "Tratamiento estético que estimula el colágeno y mejora la firmeza de la piel.",
  },
  {
    title: "Cavitación y Reducción de Grasa",
    icon: "⚡",
    description:
      "Tecnología avanzada para eliminar grasa localizada y modelar tu figura.",
  },
  {
    title: "Terapias Antiestrés",
    icon: "🕉️",
    description:
      "Relaja tu mente y cuerpo con nuestras sesiones diseñadas para tu bienestar emocional.",
  },
];

export default function TeamBenefits() {
  return (
    <section className="py-16 px-6 text-center bg-white">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">
        Bienestar y Belleza con{" "}
        <span className="text-pink-600">Siluette Plus</span>
      </h2>
      <p className="max-w-xl mx-auto text-gray-600 mb-10">
        En Siluette Plus te ofrecemos una experiencia única de relajación y
        cuidado personal, con tratamientos que combinan tecnología y bienestar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-6 items-end text-right">
          {leftItems.map((item, idx) => (
            <div key={idx} className="max-w-xs">
              <div className="text-2xl">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Imagen central */}
        <div className="flex justify-center">
          <img
            src="/img/silluet_logo.png"
            alt="Siluette Plus - Bienestar, Belleza y Salud"
            className="rounded-full object-cover w-72 h-72 shadow-md border-4 border-pink-300"
          />
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-6 items-start text-left">
          {rightItems.map((item, idx) => (
            <div key={idx} className="max-w-xs">
              <div className="text-2xl">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
