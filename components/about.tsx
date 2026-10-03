import { capabilityGroups, education, profile } from "@/lib/portfolio-data";
import { Reveal, RuleReveal } from "@/components/motion-primitives";

export function About() {
  return (
    <section id="about" className="paper-section about-section" aria-labelledby="about-title">
      <Reveal className="section-index">
        <span>01</span>
        <span>About</span>
      </Reveal>

      <Reveal className="about-lead">
        <p className="eyebrow">{profile.headline}</p>
        <h2 id="about-title">
          Ideas become useful when every layer <em>works together.</em>
        </h2>
      </Reveal>

      <Reveal className="about-body" delay={0.08}>
        <p>
          I&apos;m a Software Development Engineer Intern at CG Infinity and a Computer Science
          undergraduate at Maharaja Surajmal Institute of Technology, Delhi. I enjoy building
          scalable web applications, backend systems, and AI-powered products.
        </p>
        <p>
          My experience spans full-stack development, real-time systems, and Retrieval-Augmented
          Generation solutions. I&apos;m especially interested in backend engineering, distributed
          systems, cloud technologies, and practical applications of Generative AI.
        </p>
      </Reveal>

      <div className="paper-note" aria-hidden="true">
        <span>Field note</span>
        <strong>Curiosity over convention.</strong>
        <i>MA / 2026</i>
      </div>

      <Reveal className="capability-list" delay={0.12}>
        {capabilityGroups.map((capability) => (
          <article key={capability.label}>
            <span>{capability.label}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </article>
        ))}
      </Reveal>

      <div className="about-education">
        <Reveal className="section-index">
          <span>Education</span>
          <span>Learning in public</span>
        </Reveal>

        <Reveal className="education-heading">
          <p className="eyebrow">Technical foundation</p>
          <h2 id="education-title">
            Shaped by <em>making.</em>
          </h2>
          <p>Expected graduation / {profile.graduationYear}</p>
        </Reveal>

        <div className="education-list">
          {education.map((item, index) => (
            <Reveal key={item.institution} delay={index * 0.12} distance={60}>
              <article>
                <span className="education-number">0{index + 1}</span>
                <div>
                  <span className="education-period">{item.period}</span>
                  <h3>{item.institution}</h3>
                  <p className="education-qualification">{item.qualification}</p>
                  <p>{item.detail}</p>
                </div>
                <span className="education-mark" aria-hidden="true">↗</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <RuleReveal className="paper-rule-reveal" />
    </section>
  );
}
