import { archivedProjects } from "@/lib/portfolio-data";
import { Reveal } from "@/components/motion-primitives";

export function ProjectArchive() {
  return (
    <section className="archive-section" aria-labelledby="archive-title">
      <Reveal className="archive-heading">
        <p className="eyebrow">More experiments</p>
        <h2 id="archive-title">Project archive</h2>
      </Reveal>

      <div className="archive-list">
        <div className="archive-labels" aria-hidden="true">
          <span>Index / Project</span>
          <span>Stack</span>
          <span>Links</span>
        </div>
        {archivedProjects.map((project) => (
          <Reveal key={project.title} delay={(Number(project.index) - 4) * 0.1}>
            <article>
              <div className="archive-title">
                <span>{project.index}</span>
                <div>
                  <h3>{project.shortTitle}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
              <p className="archive-stack">{project.technologies.join(" / ")}</p>
              <div className="archive-links">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">Live <span aria-hidden="true">↗</span></a>
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Code <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}