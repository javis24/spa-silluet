"use client";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ServiceSection from "@/components/ServiceSection";
import TeamMembers from "@/components/TeamMembers";
import TeamBenefits from "@/components/TeamBenefits";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";

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
