import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { SECTION_IDS } from "../hooks/useSectionScroll";
import { useMagneticTicks } from "../hooks/useMagneticTicks";

const LABELS = {
  intro: "Intro",
  // about: "About",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
};

function SectionDots({ activeId, onNavigate }) {
  const index = Math.max(0, SECTION_IDS.indexOf(activeId));
  const prevId = index > 0 ? SECTION_IDS[index - 1] : null;
  const nextId =
    index < SECTION_IDS.length - 1 ? SECTION_IDS[index + 1] : null;

  const { navRef, setItemRef, onPointerEnter, onPointerMove, onPointerLeave } =
    useMagneticTicks("y");

  return (
    <nav
      ref={navRef}
      className="section-ticks"
      aria-label="Section navigation"
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <button
        ref={setItemRef(0)}
        type="button"
        className="section-ticks-chevron"
        aria-label="Previous section"
        disabled={!prevId}
        onClick={() => prevId && onNavigate(prevId)}
      >
        <HiChevronUp size={18} aria-hidden="true" />
      </button>

      {SECTION_IDS.map((id, i) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            ref={setItemRef(i + 1)}
            type="button"
            aria-label={LABELS[id]}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onNavigate(id)}
            className={`section-tick ${isActive ? "is-active" : ""}`}
          >
            <span className="section-tick-label">{LABELS[id]}</span>
            <span className="section-tick-mark" aria-hidden="true" />
          </button>
        );
      })}

      <button
        ref={setItemRef(SECTION_IDS.length + 1)}
        type="button"
        className="section-ticks-chevron"
        aria-label="Next section"
        disabled={!nextId}
        onClick={() => nextId && onNavigate(nextId)}
      >
        <HiChevronDown size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}

export default SectionDots;
