"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const statements = [
  "Systems with a pulse",
  "Interfaces with intent",
  "Ideas made tangible",
];

export function KineticStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], ["8%", "-38%"]);
  const x = useSpring(rawX, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <section ref={sectionRef} className="kinetic-section" aria-label="Design philosophy">
      <div className="kinetic-meta">
        <span>Manifesto</span>
        <span>Scroll to shift perspective</span>
      </div>
      <motion.div className="kinetic-track" style={{ x: reduceMotion ? 0 : x }}>
        {[...statements, ...statements].map((statement, index) => (
          <p className={index % 2 ? "kinetic-outline" : ""} key={`${statement}-${index}`}>
            {statement}<i>✦</i>
          </p>
        ))}
      </motion.div>
    </section>
  );
}
