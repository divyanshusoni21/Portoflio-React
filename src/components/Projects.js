import React, { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProjectSlide, { ProjectMeta } from "./ProjectSlide";
import ProjectMediaGallery from "./ProjectMediaGallery";
import { projects } from "../data/projects";
import { useMediaQuery } from "../hooks/useMediaQuery";
import "../css/project.css";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function ProjectArrowNav({ activeIndex, total, onGo }) {
  return (
    <div
      className="projects-arrow-nav"
      role="group"
      aria-label={`Project ${activeIndex + 1} of ${total}`}
    >
      <button
        type="button"
        className="project-nav-btn"
        aria-label="Previous project"
        disabled={activeIndex === 0}
        onClick={() => onGo(-1)}
      >
        <HiChevronLeft size={20} aria-hidden="true" />
      </button>
      <span className="projects-arrow-count" aria-live="polite">
        {pad2(activeIndex + 1)} / {pad2(total)}
      </span>
      <button
        type="button"
        className="project-nav-btn"
        aria-label="Next project"
        disabled={activeIndex === total - 1}
        onClick={() => onGo(1)}
      >
        <HiChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  );
}

function ProjectsStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = projects.length;
  const project = projects[activeIndex];

  const go = useCallback(
    (dir) => {
      const next = Math.max(0, Math.min(activeIndex + dir, total - 1));
      if (next === activeIndex) return;
      setDirection(dir);
      setActiveIndex(next);
    },
    [activeIndex, total]
  );

  return (
    <section
      id="projects"
      data-section="projects"
      className="projects-panel projects-panel--stack"
      aria-labelledby="projects-heading"
    >
      <div className="projects-chrome">
        <h2 id="projects-heading" tabIndex={-1} className="section-title">
          Projects
        </h2>
        <ProjectArrowNav activeIndex={activeIndex} total={total} onGo={go} />
      </div>

      <article
        key={project.name}
        className="project-card"
        aria-label={`${project.name}, project ${activeIndex + 1} of ${total}`}
      >
        <ProjectMediaGallery
          media={project.media}
          projectName={project.name}
          direction={direction}
        />
        <ProjectMeta {...project} direction={direction} />
      </article>
    </section>
  );
}

function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = projects.length;
  const project = projects[activeIndex];

  const go = useCallback(
    (dir) => {
      const next = Math.max(0, Math.min(activeIndex + dir, total - 1));
      if (next === activeIndex) return;
      setDirection(dir);
      setActiveIndex(next);
    },
    [activeIndex, total]
  );

  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;

    const onKey = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (!section.contains(document.activeElement) && document.activeElement !== section) {
        return;
      }
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      e.preventDefault();
      if (e.key === "ArrowLeft") go(-1);
      else go(1);
    };

    section.addEventListener("keydown", onKey);
    return () => section.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      id="projects"
      data-section="projects"
      className="projects-panel"
      aria-labelledby="projects-heading"
    >
      <div className="projects-chrome">
        <h2 id="projects-heading" tabIndex={-1} className="section-title">
          Projects
        </h2>
      </div>

      <div
        className="projects-media-slot"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        <ProjectSlide
          key={project.name}
          name={project.name}
          media={project.media}
          index={activeIndex}
          total={total}
          direction={direction}
        />
      </div>

      <ProjectMeta
        {...project}
        direction={direction}
        pager={
          <ProjectArrowNav activeIndex={activeIndex} total={total} onGo={go} />
        }
      />
    </section>
  );
}

const Projects = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? <ProjectsCarousel /> : <ProjectsStack />;
};

export default Projects;
