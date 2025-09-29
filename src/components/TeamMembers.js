"use client";

export default function TeamMembers({ members }) {
  return (
    <section className="py-10 bg-pink-300">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Nuestros Expertos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={member.image}
                alt={`${member.name} - ${member.role} en SiluettePlus JC`}
                width={320}
                height={320}
                className="object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <p className="text-gray-700">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
