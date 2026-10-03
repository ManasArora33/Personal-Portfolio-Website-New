"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  hue: number;
  phase: number;
};

const colors = ["#6684ff", "#7894ff", "#9eb1ff", "#5e7cff", "#c7d1ff"];

export function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const pointer = { x: 0, y: 0, active: false };
    const particles: Particle[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (particles.length === 0) {
        const count = width < 600 ? 120 : 240;
        for (let index = 0; index < count; index += 1) {
          particles.push({
            angle: Math.random() * Math.PI * 2,
            distance: 0.12 + Math.random() * 0.94,
            speed: 0.00012 + Math.random() * 0.00028,
            size: 0.65 + Math.random() * 2.2,
            hue: Math.floor(Math.random() * colors.length),
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = parent.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = width * 0.53;
      const radiusY = height * 0.62;

      particles.forEach((particle) => {
        if (!reduceMotion) particle.angle += particle.speed * 16;
        const pulse = Math.sin(time * 0.001 + particle.phase) * 0.035;
        const distance = particle.distance + pulse;
        let x = centerX + Math.cos(particle.angle) * radiusX * distance;
        let y = centerY + Math.sin(particle.angle) * radiusY * distance;

        if (pointer.active && !reduceMotion) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / 260);
          x += (dx / Math.max(distance, 1)) * influence * 32;
          y += (dy / Math.max(distance, 1)) * influence * 32;
        }

        context.save();
        context.translate(x, y);
        context.rotate(particle.angle + Math.PI / 2);
        context.globalAlpha = 0.35 + particle.distance * 0.55;
        context.fillStyle = colors[particle.hue];
        context.fillRect(-particle.size / 2, -particle.size * 2.2, particle.size, particle.size * 4.4);
        context.restore();
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    parent.addEventListener("pointermove", handlePointerMove);
    parent.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="hero-particle-field" aria-hidden="true" />;
}
