import { experience, profile } from "@/lib/portfolio-data";
import { Reveal } from "@/components/motion-primitives";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <Reveal className="section-index section-index--dark">
        <span>02</span>
        <span>Experience</span>
      </Reveal>

      <div className="experience-layout">
        <Reveal className="experience-intro" direction="right">
          <p className="eyebrow">Professional practice</p>
          <h2 id="experience-title">
            Learning systems
            <br /> by shipping them.
          </h2>
          <p>
            Product-minded engineering informed by real constraints, collaboration, and continuous
            learning.
          </p>
          <a className="button button--paper" href={profile.resume} target="_blank" rel="noreferrer">
            View full resume ↗
          </a>
        </Reveal>

        <div className="experience-records">
          {experience.map((item, index) => (
            <Reveal key={item.company} delay={index * 0.12}>
              <article className="experience-card">
                <div className="experience-card-top">
                  <span>{item.period}</span>
                  <strong aria-hidden="true">CG</strong>
                </div>
                <div className="experience-card-body">
                  <p>{item.company}</p>
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                  <ul aria-label="Role focus">
                    <li>Software development</li>
                    <li>Backend systems</li>
                    <li>Product engineering</li>
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}