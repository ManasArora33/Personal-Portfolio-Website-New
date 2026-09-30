"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX - 18);
      pointerY.set(event.clientY - 18);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [pointerX, pointerY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="cursor-circle"
      style={{ x: pointerX, y: pointerY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.08 } }}
    />
  );
}