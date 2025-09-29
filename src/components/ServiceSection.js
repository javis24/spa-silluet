"use client";

import { useState } from "react";


  const services = [
  { id: 'facials', name: 'Drenaje Linfático', image: '/img/drenaje.png', description: 'Drenaje linfático es una técnica que mediante suaves y repetidas maniobras con duración de 20 a 30min, siempre superficiales sobre la piel, logra acelerar e incluso redirigir la circulación linfática superficial. Su aplicación acelera la reabsorción del edema. Es un método que tiene como finalidad drenar líquidos subcutaneos hacia los ganglios, es excelente para personas muy sedentarias y también para pacientes con cirugías estéticas recientes.' },
  { id: 'mesotherapy', name: 'Mesoterapia', image: '/img/mesoterapiacorporal.png', description: 'Es una técnica que consiste en microinyecciones con sustancias que disuelven la grasa, o revitalizan, regeneración dependiendo del resultado que se desee lograr pueden ser alopatas u homeopáticos, así como minerales, vitaminas y aminoácidos sirven para reducir grasa, flacidez, celulitis y estrias' },
  { id: 'lipolaser', name: 'Ultra Lipolaser', image: '/img/ultra_lipolaser.png', description: 'Esta nueva tecnología es capaz de estimular la cadena enzimática fisiológica del metabolismo de las grasas. Gracias al láser de baja potencia se consigue una fotolipolisis que fragmenta los triglicéridos y los transforma en glicerol, ácidos grasos y agua, que se eliminara por la vías linfáticas, y reduce tallas significativamente, Excelente después de un embarazo.' },
  { id: 'ultracavitation', name: 'Ultra Cavitación', image: '/img/cavitacion.png', description: 'Cavitacion es un tratamiento no invasivo que combate grasa localizada y la celulitis mediante la aplicación de ultrasonidos. A nivel de superficie externa de la piel piel.' },
  { id: 'radiofrequency', name: 'Ultra Radiofrecuencia', image: '/img/ultra_radiofrecuencia.png', description: 'Radiofrecuencia bipolar son radiaciones electromagnéticas que oscilan simultáneamente en el campo eléctrico y magnetico, que favorece a la producción de colágeno y elastina, donde favorece a el drenaje linfático, aumento de circulación y eliminación de flacidez.' },
  { id: 'vacuumPro', name: 'Vacuum Pro', image: '/img/vacuum.png', description: 'es una aparato con tecnología de succión y arrastre que sirve para eliminar la grasa y disminuir la celulitis, tiene efectos exfoliantes, aporta elasticidad a la piel y relaja la musculatura también nos ayuda para hacer un moldeamiento corporal completo.' },
  { id: 'gympasiva', name: 'Gym Pasiva', image: '/img/electroestimulacion.png', description: 'es una técnica que utiliza electrodos para estimular los músculos y tonificar el cuerpo sin necesidad de realizar ejercicio físico intenso. Se trata de una técnica estética segura y no invasiva que puede ser útil para personas con limitaciones físicas o que buscan tonificar sus músculos. Beneficios de la gimnasia pasiva son: Tonificar y definir los músculos Corregir la flacidez Mejorar la circulación Combatir la celulitis Aliviar dolores musculares Reducir la rigidez Disminuir la fatiga muscular Mejorar la elasticidad de la piel Reducir la retención de líquidos' },
  { id: 'maderoterapia', name: 'Maderoterapia', image: '/img/Maderoterapia.png', description: 'Maderoterapia: Es una técnica que dura entre 20 a 40min. para aplicarse en tratamientos reductivos, moldeadores, anticelulitis, levantamiento de glúteos y reafirmantes, teniendo resultados desde la primera sesión.' },
  { id: 'desintoxicacion', name: 'Desintoxicación Ionica', image: '/img/desintoxicacionionica.png', description: 'la desintoxicación iónica mejora la microcirculación proporcionando un equilibrio en su cuerpo, interviene en la regulación de fuente de oxígeno y de nutrientes a los tejidos, así como la eliminación apropiada de los residuos (toxinas) fuera del cuerpo.' },
  { id: 'peptonas', name: 'Peptonas', image: '/img/peptonas.png', description: 'Las peptonas son compuestos orgánicos naturales que se utilizan en tratamientos estéticos para aumentar el volumen y tono muscular.' },
  { id: 'copasparagluteo', name: 'Copas Para Glúteo', image: '/img/gluteoaparatologia.png', description: 'Las copas de vacío para glúteos son un dispositivo que se utiliza en la vacumterapia para levantar y tonificar los glúteos.' },
  { id: 'laseryag', name: 'Laser YAG', image: '/img/laseryag.png', description: 'Se utiliza para el rejuvenecimiento facial, ya que calienta los vasos sanguíneos de la dermis para estimular la producción de colágeno. También se puede utilizar para tratar la rosácea no inflamatoria, estrías, cicatrices, manchas oscuras, líneas de expresión, arrugas y eliminación de tatuajes.' },
  { id: 'depilacionlaserdefinitiva', name: 'Depilación Laser Definitiva', image: '/img/depilacionlaser.png', description: 'La depilación con láser Trio es un sistema de depilación que combina tres tecnologías diferentes para ofrecer un tratamiento completo y personalizado. El láser Trio no es un tipo específico de láser, sino un dispositivo que integra múltiples tecnologías para abordar diferentes tipos de piel y vello.' },
  { id: 'hollywoodpeel', name: 'Hollywood PEEL', image: '/img/hollywoodpeel.png', description: 'El Hollywood Peel, Carbon-peel o peeling de carbón activado, corresponde al nominativo de una técnica mixta en la que usamos la sinergia de una aplicación de Crema de Carbono en diferentes diluciones con la Energía emitida por una fuente de Luz Láser yag que lo “Barre”. Ese efecto combinado del activo + la energía lumínica es local y superficial, no invasivo, prácticamente indoloro y que podemos utilizar en diferentes indicaciones.' },
  { id: 'hydrafacial', name: 'HydraFacial', image: '/img/hydrafacial.png', description: 'La magia de Hydrafacial está en la varita mágica (pieza de mano), que funciona como una aspiradora para abrir los poros para una limpieza profunda y una fácil extracción de las impurezas y las células muertas de la piel, además nos beneficia para reafirmar tu piel!.' },
  { id: 'masajerelajante', name: 'Masaje Relajante', image: '/img/masajerelajante.png', description: 'Esta técnica de masaje ayuda a liberar de nuestro cuerpo toxinas que producen muchos trastornos como: Dolores de cabeza, problemas digestivos, dolores de espalda, hombros, así como tambien insomnio ansiedad, irritabilidad, falta de concentración, depresión, etc.' },
  { id: 'carboxiterapia', name: 'Carboxiterapia', image: '/img/carboxiterapia.png', description: 'Carboxiterapia es un procedimiento estético que consiste en la aplicación de inyecciones de gas carbónico. Se aplica por debajo de la piel y sirve para eliminar celulitis, estrías, ojeras, grasa localizada, tratar la flacidez y fibrosis.' },
];

export default function ServiceSection() {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const currentService = services.find(service => service.id === selectedService);

  const whatsappNumber = "528713330566";
  const whatsappMessage = "Me interesa una cita";

  return (
    <section id="servicios" className="py-10 bg-amber-50 text-pink-600">
      <div className="service-section grid grid-cols-1 lg:grid-cols-3 p-5 gap-5">
        {/* Menú lateral */}
        <div className="sidebar-menu grid gap-3 grid-cols-2 lg:grid-cols-2 lg:col-span-1">
          {services.map((service) => (
            <button
              key={service.id}
              className={`menu-item px-4 py-2 rounded ${selectedService === service.id ? 'bg-pink-600' : 'bg-pink-400'} text-white`}
              onClick={() => setSelectedService(service.id)}
            >
              {service.name}
            </button>
          ))}
        </div>

        <div className="content-display lg:col-span-2 p-5 border-t lg:border-t-0 lg:border-l border-gray-300">
          {currentService && (
            <div className="content-wrapper flex flex-col lg:flex-row lg:space-x-4">
              <img
                src={currentService.image}
                alt={`Tratamiento ${currentService.name} en SiluettePlus JC`}
                width="300"
                height="300"
                className="content-image w-full lg:w-[300px] rounded mb-4 lg:mb-0"
              />
              <div className="content-text max-w-lg">
                <h2 className="text-2xl font-semibold">{currentService.name}</h2>
                <p>{currentService.description}</p>
                <br />
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="more-btn bg-[#ff4d8b] text-white px-4 py-2 rounded mt-2 inline-block"
                >
                  Agendar Cita
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
