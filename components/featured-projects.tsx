"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { featuredProjects } from "@/lib/portfolio-data";
import { Reveal } from "@/components/motion-primitives";

export function FeaturedProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <Reveal className="section-index">
        <span>05</span>
        <span>Selected work</span>
      </Reveal>

      <Reveal className="work-heading">
        <p className="eyebrow">Built across the stack</p>
        <h2 id="work-title">
          Three products,
          <br /> three different problems.
        </h2>
      </Reveal>

      <div className="featured-projects">
        {featuredProjects.map((project, index) => (
          <motion.article
            className="featured-project"
            key={project.title}
            initial={reduceMotion ? false : { opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="project-copy">
              <span className="project-index">Project / {project.index}</span>
              <span className="project-discipline">Full-stack case study</span>
              <h3>{project.shortTitle}</h3>
              <p>{project.description}</p>
              <ul className="technology-list" aria-label={`${project.shortTitle} technologies`}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="project-links">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live product <span aria-hidden="true">↗</span>
                </a>
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  Source code <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <motion.a
              className="project-media"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.shortTitle} live project`}
              data-cursor="explore"
              whileHover={reduceMotion ? undefined : { rotate: index % 2 ? 1.2 : -1.2, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <span className="project-media-label">0{index + 1} / Featured</span>
              <span className="project-sticker" aria-hidden="true">VIEW<br />LIVE ↗</span>
              <span className="project-image-clip">
                <Image
                  src={project.image}
                  alt={`${project.shortTitle} application interface`}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
              </span>
            </motion.a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}