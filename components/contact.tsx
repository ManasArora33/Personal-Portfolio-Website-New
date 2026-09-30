"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/portfolio-data";

export function Contact() {
  const [status, setStatus] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(
      "Your message looks ready. Direct sending is not connected yet, so please use the email link beside the form.",
    );
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="section-index">
        <span>06</span>
        <span>Contact</span>
      </div>

      <motion.div
        className="contact-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow">Have a useful idea?</p>
        <h2 id="contact-title">
          Let&apos;s turn it into
          <br /> something real.
        </h2>
      </motion.div>

      <motion.div
        className="contact-grid"
        initial={reduceMotion ? false : { opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <form className="contact-form" onSubmit={handleSubmit} data-cursor="form">
          <p className="form-note">Form preview / direct sending is being connected</p>
          <div className="field-row">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="Name" autoComplete="name" required />
          </div>
          <div className="field-row">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div className="field-row">
            <label htmlFor="message">What are you building?</label>
            <textarea id="message" name="message" placeholder="A short project outline..." rows={5} required />
          </div>
          <button className="button button--dark" type="submit">
            Check message
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status}
          </p>
        </form>

        <aside className="contact-details" aria-label="Direct contact details">
          <p>
            The reliable route is direct. Send an email with the problem, context, and what a good
            outcome looks like.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <dl>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Elsewhere</dt>
              <dd>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </dd>
            </div>
            <div>
              <dt>Document</dt>
              <dd>
                <a href={profile.resume} target="_blank" rel="noreferrer">Download resume</a>
              </dd>
            </div>
          </dl>
        </aside>
      </motion.div>
    </section>
  );
}