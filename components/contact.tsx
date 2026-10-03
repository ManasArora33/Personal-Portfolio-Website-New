"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { profile } from "@/lib/portfolio-data";

type SubmissionState = {
  type: "idle" | "sending" | "success" | "error";
  message: string;
};

const initialForm = { name: "", email: "", message: "" };

export function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<SubmissionState>({ type: "idle", message: "" });
  const reduceMotion = useReducedMotion();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message: "The contact form is not configured yet. Please use the direct email link.",
      });
      return;
    }

    setStatus({ type: "sending", message: "Sending your message..." });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          to_name: profile.name,
          message: formData.message,
        },
        { publicKey },
      );
      setFormData(initialForm);
      setStatus({
        type: "success",
        message: "Message sent. Thanks for reaching out — I’ll get back to you soon.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "The message could not be sent. Please try again or use the direct email link.",
      });
    }
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="section-index">
        <span>05</span>
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
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          data-cursor="form"
          aria-busy={status.type === "sending"}
        >
          <p className="form-note">Messages are delivered through EmailJS</p>
          <div className="field-row">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              disabled={status.type === "sending"}
              required
            />
          </div>
          <div className="field-row">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status.type === "sending"}
              required
            />
          </div>
          <div className="field-row">
            <label htmlFor="message">What are you building?</label>
            <textarea
              id="message"
              name="message"
              placeholder="A short project outline..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={status.type === "sending"}
              required
            />
          </div>
          <button className="button button--dark" type="submit" disabled={status.type === "sending"}>
            {status.type === "sending" ? "Sending..." : "Send message"}
          </button>
          <p className="form-status" data-state={status.type} role="status" aria-live="polite">
            {status.message}
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
