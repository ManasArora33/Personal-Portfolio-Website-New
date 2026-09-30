"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "up" | "left" | "right";
};

const easing = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 42,
  direction = "up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: 0,
        x: direction === "left" ? distance : direction === "right" ? -distance : 0,
        y: direction === "up" ? distance : 0,
      };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function RuleReveal({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={className ?? "motion-rule"}
      initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.2, ease: easing }}
    />
  );
}