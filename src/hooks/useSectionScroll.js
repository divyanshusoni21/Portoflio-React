import { useCallback, useEffect, useRef, useState } from "react";

export const SECTION_IDS = [
    "intro",
  //  "about", 
  "projects",
    "skills",
    "contact"];
const MAIN_ID = "main-scroll";

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Vertical section navigation: scrolls #main-scroll to the section element.
 */
export function scrollToSection(id, { focus = true, behavior } = {}) {
  if (typeof document === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  const scrollBehavior =
    behavior ?? (prefersReducedMotion() ? "auto" : "smooth");

  el.scrollIntoView({ block: "start", behavior: scrollBehavior });

  if (focus) {
    requestAnimationFrame(() => {
      const heading =
        el.querySelector("h1, h2") || el;
      if (heading && heading !== document.activeElement) {
        if (!heading.hasAttribute("tabindex")) {
          heading.setAttribute("tabindex", "-1");
        }
        try {
          heading.focus({ preventScroll: true });
        } catch {
          // ignore focus errors
        }
      }
    });
  }
}

export function scrollToHashOnMount() {
  if (typeof window === "undefined") return;
  const id = window.location.hash.replace(/^#/, "");
  if (!SECTION_IDS.includes(id)) return;

  // Wait for layout so scroll-margin offsets are correct
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSection(id, { focus: false, behavior: "auto" });
    });
  });
}

export function useActiveSection(ids = SECTION_IDS) {
  const [activeId, setActiveId] = useState(ids[0] || "intro");
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    const main = document.getElementById(MAIN_ID);
    if (!main) return undefined;

    const update = () => {
      const header = document.querySelector("header");
      const probe = (header?.getBoundingClientRect().bottom ?? 56) + 8;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= probe) current = id;
      });
      if (current && current !== activeIdRef.current) {
        activeIdRef.current = current;
        setActiveId(current);
      }
    };

    update();
    main.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      main.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return activeId;
}

export function useSectionScroll(ids = SECTION_IDS) {
  const activeId = useActiveSection(ids);

  const navigate = useCallback((id, options) => {
    scrollToSection(id, options);
  }, []);

  useEffect(() => {
    scrollToHashOnMount();
  }, []);

  return { activeId, scrollToSection: navigate };
}