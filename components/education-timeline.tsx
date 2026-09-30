import { education, profile } from "@/lib/portfolio-data";
import { Reveal } from "@/components/motion-primitives";

export function EducationTimeline() {
  return (
    <section className="education-section" aria-labelledby="education-title">
      <Reveal className="section-index section-index--dark">
        <span>03</span>
        <span>Education</span>
      </Reveal>

      <Reveal className="education-heading">
        <p className="eyebrow">Learning in public</p>
        <h2 id="education-title">
          A technical foundation,
          <br /> shaped by making.
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
    </section>
  );
}