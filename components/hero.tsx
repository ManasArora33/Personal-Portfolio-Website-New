"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/portfolio-data";
import { SentientSphere } from "@/components/sentient-sphere";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.72], [1, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 0.72], [0, 90]);

  return (
    <motion.section ref={sectionRef} id="top" className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero-kicker"
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>{profile.role}</span>
        <span>India / {profile.graduationYear}</span>
      </motion.div>

      <motion.div
        className="hero-grid"
        style={reduceMotion ? undefined : { opacity: contentOpacity, scale: contentScale, y: contentY }}
      >
        <div className="hero-copy">
          <motion.p
            className="hero-intro"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Hello, I&apos;m
          </motion.p>
          <h1 id="hero-title">
            <span className="hero-name-mask">
              <motion.span
                initial={reduceMotion ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                Manas
              </motion.span>
            </span>
            <span className="hero-name-mask">
              <motion.em
                initial={reduceMotion ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                Arora
              </motion.em>
            </span>
          </h1>
          <motion.p
            className="hero-summary"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            I build scalable products across interface, backend, and data, with a focus on
            practical AI-powered systems.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="button button--paper" href="#work">
              Explore selected work
            </a>
            <a className="text-link" href="#contact">
              Start a conversation <span aria-hidden="true">↘</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual-shell"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.76, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.15, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SentientSphere />
          <span className="visual-caption visual-caption--top">Sentient interface / 01</span>
          <span className="visual-caption visual-caption--bottom">Move pointer to distort</span>
        </motion.div>
      </motion.div>

      <motion.a
        className="scroll-cue"
        href="#about"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span>Scroll to inspect</span>
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.a>
    </motion.section>
  );
}