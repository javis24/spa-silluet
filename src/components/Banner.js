"use client";

import { motion } from "framer-motion";

export default function Banner() {
  const textRow1 = ["Tu", "Belleza", "Natural"];
  const textRow2 = ["SiluettePlus", "JC"];

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 1,
      },
    }),
  };

  return (
    <section
      className="relative h-[500px] bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/img/banner_01.png')" }}
      aria-label="Banner SiluettePlus JC - Belleza Natural"
    >
      <div className="absolute left-0 w-1/2 p-10 flex flex-col space-y-4">
        <h1 className="text-5xl font-bold text-pink-500 flex flex-wrap gap-2">
          {textRow1.map((word, index) => (
            <motion.span
              key={`row1-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={textVariant}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <h1 className="text-5xl font-bold text-pink-500 flex flex-wrap gap-2">
          {textRow2.map((word, index) => (
            <motion.span
              key={`row2-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={textVariant}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>
    </section>
  );
}
