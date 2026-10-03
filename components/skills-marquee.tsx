import { skills } from "@/lib/portfolio-data";
import { Reveal } from "@/components/motion-primitives";

export function SkillsMarquee() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <Reveal className="skills-heading">
        <div className="section-index section-index--dark">
          <span>03</span>
          <span>Toolkit</span>
        </div>
        <h2 id="skills-title">Technologies in motion.</h2>
        <p>A practical toolkit for taking products from browser to database.</p>
      </Reveal>

      <ul className="sr-only">
        {skills.flat().map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <div className="marquee-stack" aria-hidden="true">
        {skills.map((row, rowIndex) => {
          const repeatedSkills = [...row, ...row];
          return (
            <div className="marquee" key={row.join("-")}>
              <div className={`marquee-track${rowIndex === 1 ? " marquee-track--reverse" : ""}`}>
                {repeatedSkills.map((skill, index) => (
                  <span key={`${skill}-${index}`}>
                    {skill}
                    <i>+</i>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
