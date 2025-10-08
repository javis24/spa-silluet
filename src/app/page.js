

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ServiceSection from "@/components/ServiceSection";
import TeamMembers from "@/components/TeamMembers";
import TeamBenefits from "@/components/TeamBenefits";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SiluettePlus | Clínica de Tratamientos Estéticos en Gómez Palacio",
  description:
    "Descubre los mejores tratamientos faciales, corporales y reductivos en SiluettePlus. Expertos en bienestar y belleza en Gómez Palacio, Durango.",
  keywords:
    "spa, tratamientos estéticos, facial, corporal, cavitación, radiofrecuencia, SiluettePlus, Gómez Palacio, belleza, salud",
  authors: [{ name: "SiluettePlus" }],
  openGraph: {
    title: "SiluettePlus | Clínica de Belleza y Bienestar",
    description:
      "Transforma tu cuerpo y mente con nuestros tratamientos personalizados. Agenda tu cita hoy.",
    url: "https://siluetteplus.com",
    siteName: "SiluettePlus",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Tratamientos estéticos SiluettePlus",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiluettePlus | Clínica de Tratamientos Estéticos",
    description: "Agenda tu cita en SiluettePlus y luce espectacular.",
    images: ["/images/banner.jpg"],
  },
};

const teamMembersData = [
  {
    name: "Dr. Elena García",
    role: "Dermatóloga Estética",
    description: "Experta en rejuvenecimiento facial y tratamientos avanzados de la piel.",
    image: "/img/team/elena.jpg",
  },
  {
    name: "Carlos Méndez",
    role: "Especialista en Masajes Terapéuticos",
    description: "Maestro en técnicas de relajación y alivio del estrés.",
    image: "/img/team/carlos.jpg",
  },
  {
    name: "Sofía Ramírez",
    role: "Esteticista Corporal",
    description: "Especialista en tratamientos reductivos y moldeado corporal.",
    image: "/img/team/sofia.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Banner />
        <ServiceSection />
        <TeamMembers members={teamMembersData} />
        <TeamBenefits />
        <CoursesSection />
      </main>
      <Footer />
    </div>
  );
}
