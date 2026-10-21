import React from "react";
import { FaGithub } from "react-icons/fa";

import { FaGlobe, FaGlobeAmericas } from 'react-icons/fa'; 
import { BsGlobe2 } from 'react-icons/bs';
import ProjectMediaGallery from "./ProjectMediaGallery";

export function ProjectMeta({
  name,
  hook,
  description,
  stack = [],
  code,
  demo,
  direction = 0,
  pager,
}) {
  const dirClass =
    direction > 0 ? "is-next" : direction < 0 ? "is-prev" : "";

  return (
    <div className="project-slide-meta">
      <div className="project-slide-title-row">
        <div className="project-slide-copy-mask">
          <div
            key={name}
            className={`project-slide-heading project-slide-copy ${dirClass}`}
          >
            <h3 className="project-slide-title" aria-live="polite">
              {name}
            </h3>
            <div className="project-slide-ctas">
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-cta"
                >
                  <BsGlobe2 size={16} aria-hidden="true"/>
                  Visit site
                </a>
              )}
              {code && (
                <a
                  href={code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-cta project-cta--code"
                >
                  <FaGithub size={15} aria-hidden="true" />
                  View code
                </a>
              )}
            </div>
          </div>
        </div>
        {pager}
      </div>
      <div className="project-slide-copy-mask project-slide-copy-mask--desc">
        <div
          key={`${name}-story`}
          className={`project-slide-story project-slide-copy project-slide-copy--late ${dirClass}`}
        >
          {hook && <p className="project-slide-hook">{hook}</p>}
          {description && (
            <p className="project-slide-description">{description}</p>
          )}
          {stack.length > 0 && (
            <ul className="project-slide-chips">
              {stack.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const ProjectSlide = ({ name, media, index, total, direction = 0 }) => {
  return (
    <article
      className="project-slide"
      aria-roledescription="slide"
      aria-label={`${name}, project ${index + 1} of ${total}`}
    >
      <div className="project-slide-inner">
        <ProjectMediaGallery
          media={media}
          projectName={name}
          direction={direction}
        />
      </div>
    </article>
  );
};

export default ProjectSlide;
