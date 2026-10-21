import React from "react";
import css from "../Icons/icons8-css3.png";
import django from "../Icons/icons8-django.png";
import docker from "../Icons/icons8-docker.png";
import html from "../Icons/icons8-html.png";
import javascript from "../Icons/icons8-javascript.png";
import linux from "../Icons/icons8-linux.png";
import nginx from "../Icons/icons8-nginx.png";
import python from "../Icons/icons8-python.png";
import postgresql from "../Icons/postgresql.png";
import react from "../Icons/icons8-react.png";

import SkillsCard from "./SkillsCard";
import "../css/skills.css";

const GROUPS = [
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Python", alt: "Python icon", image: python },
      { name: "Django / DRF", alt: "Django icon", image: django },
      { name: "PostgreSQL", alt: "PostgreSQL icon", image: postgresql },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", alt: "React icon", image: react },
      { name: "JavaScript", alt: "JavaScript icon", image: javascript },
      {
        name: "HTML / CSS",
        images: [
          { src: html, alt: "HTML icon" },
          { src: css, alt: "CSS icon" },
        ],
      },
    ],
  },
  {
    id: "infra",
    title: "Infra",
    skills: [
      { name: "Docker", alt: "Docker icon", image: docker },
      { name: "Nginx", alt: "Nginx icon", image: nginx },
      { name: "Linux", alt: "Linux icon", image: linux },
    ],
  },

];

const ALSO_CHIPS = [
  "AI Apis",
  "Celery",
  "Redis",
  "GraphQL",
  "GitHub Actions",
  "AWS / DigitalOcean",
  "Git",
  "Stripe",
];

const Skills = () => {
  return (
    <section
      id="skills"
      data-section="skills"
      className="w-full md:min-h-[100dvh] bg-portfolio-bg text-portfolio-ink flex"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-[1000px] mx-auto px-4 py-4 flex flex-col justify-start md:justify-center w-full flex-1 md:min-h-[100dvh] pt-[calc(var(--nav-height)+1rem)] pb-8 md:pb-12">
        <div>
          <h2 id="skills-heading" tabIndex={-1} className="section-title w-fit">
            Skills
          </h2>
          <p className="py-2 sm:py-3 text-portfolio-muted">
            These are the techs I&apos;ve worked with
          </p>
        </div>

        <div className="skills-body">
          {GROUPS.map((group) => (
            <div key={group.id} className="skills-group">
              <h3 className="skills-group-title">{group.title}</h3>
              <div className="skills-grid">
                {group.skills.map((skill) => (
                  <SkillsCard key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}

          <ul className="skills-chips skills-chips--muted" aria-label="Also used">
            {ALSO_CHIPS.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
