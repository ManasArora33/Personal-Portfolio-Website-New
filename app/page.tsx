import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { CustomCursor } from "@/components/custom-cursor";
import { EducationTimeline } from "@/components/education-timeline";
import { ExperienceSection } from "@/components/experience-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { KineticStatement } from "@/components/kinetic-statement";
import { Navigation } from "@/components/navigation";
import { ProjectArchive } from "@/components/project-archive";
import { SkillsMarquee } from "@/components/skills-marquee";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <KineticStatement />
        <ExperienceSection />
        <EducationTimeline />
        <SkillsMarquee />
        <FeaturedProjects />
        <ProjectArchive />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
