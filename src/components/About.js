import React from "react";

const About = () => {
  return (
    <section
      id="about"
      data-section="about"
      className="w-full min-h-[100dvh] bg-portfolio-bg text-portfolio-ink flex"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col justify-center items-center w-full min-h-[100dvh] pt-[80px] pb-12 px-4">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-4 pl-4">
            <h2 id="about-heading" tabIndex={-1} className="section-title inline">
              About
            </h2>
          </div>
          <div />
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4">
          <div className="sm:text-right text-2xl sm:text-3xl font-bold text-portfolio-ink">
            <p>Hello, nice to meet you. Please take a look around.</p>
          </div>
          <div>
            <p className="text-portfolio-muted leading-relaxed">
              Started career as a self-taught developer with basic frontend and
              backend skills. Gained strong knowledge over time. Mainly worked
              as a backend developer and built live backend apps from scratch.
              Learned the power of Google (when you get stuck at something). Did
              R&amp;Ds. Faced many real-world problems while developing apps and
              solved them with logical thinking. Learned new tech stacks to
              implement them in projects.
              <br />
              <br />
              Constantly learning new things (currently React) to improve myself
              and my skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
