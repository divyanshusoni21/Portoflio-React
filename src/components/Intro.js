import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const Intro = ({ onNavigate }) => {
  return (
    <section
      id="intro"
      data-section="intro"
      className="bg-portfolio-bg w-full min-h-[100dvh] flex"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-[1000px] mx-auto px-4 flex flex-col justify-center w-full flex-1 pt-[calc(var(--nav-height)+1rem)] pb-10 md:pb-12 gap-5 md:gap-6">
        <div>
          <p className="text-portfolio-muted text-sm sm:text-base tracking-wide">
            Hello, myself
          </p>
          <h1
            id="intro-heading"
            tabIndex={-1}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-portfolio-green mt-2"
          >
            Divyanshu Soni
          </h1>
          <h2 className="text-xl sm:text-4xl lg:text-5xl font-semibold text-portfolio-ink mt-3">
            I&apos;m a Backend Software Engineer
          </h2>
        </div>
        <p className="text-portfolio-muted py-2 sm:py-0 leading-relaxed w-full">
          Backend developer with 4+ years of experience building scalable
          Python/Django applications. Proficient in cloud deployment, CI/CD
          automation, database query optimization, and payment integrations.
          Highly effective at leveraging AI coding assistants to enhance
          developer velocity and write clean, maintainable code.
        </p>
        <div>
          <button
            type="button"
            onClick={() => onNavigate?.("projects")}
            className="group border-2 border-portfolio-ink text-portfolio-ink px-6 py-3 my-1 sm:my-2 w-full sm:w-auto justify-center inline-flex items-center hover:bg-portfolio-green hover:border-portfolio-green hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-portfolio-green focus-visible:ring-offset-2"
          >
            See projects
            <span className="group-hover:translate-x-1 md:group-hover:translate-x-1 duration-300 inline-flex">
              <HiArrowNarrowRight className="ml-3" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Intro;
