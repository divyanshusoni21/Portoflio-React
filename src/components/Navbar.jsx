import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const NAV_ITEMS = [
  { id: "intro", label: "Intro" },
  // { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Navbar({ activeId, onNavigate }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [highlightId, setHighlightId] = useState(activeId);
  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0, ready: false });

  const navRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    setHighlightId(activeId);
  }, [activeId]);

  const handleNavigate = (id) => {
    setHighlightId(id);
    onNavigate?.(id);
  };

  const setItemRef = useCallback((id) => (node) => {
    if (node) itemRefs.current[id] = node;
    else delete itemRefs.current[id];
  }, []);

  const updatePill = useCallback(() => {
    const nav = navRef.current;
    const activeEl = itemRefs.current[highlightId];
    if (!nav || !activeEl) {
      setPill((prev) => ({ ...prev, ready: false }));
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    const padX = 12;
    const padY = 0;

    setPill({
      left: itemRect.left - navRect.left - padX,
      top: itemRect.top - navRect.top - padY,
      width: itemRect.width + padX * 2,
      height: itemRect.height + padY * 2,
      ready: true,
    });
  }, [highlightId]);

  useLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  useEffect(() => {
    const onResize = () => updatePill();
    window.addEventListener("resize", onResize);

    let ro;
    if (typeof ResizeObserver !== "undefined" && navRef.current) {
      ro = new ResizeObserver(onResize);
      ro.observe(navRef.current);
    }

    document.fonts?.ready?.then(updatePill);

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [updatePill]);

  return (
    <header className="fixed top-0 left-0 w-full h-[var(--nav-height)] pt-[env(safe-area-inset-top,0px)] box-border flex justify-center items-center px-3 md:px-8 bg-white/95 backdrop-blur border-b border-portfolio-border text-portfolio-ink z-50">
      {isDesktop ? (
        <nav ref={navRef} className="nav-desktop" aria-label="Primary">
          <span
            className={`nav-highlighter ${pill.ready ? "is-ready" : ""}`}
            aria-hidden="true"
            style={{
              transform: `translate3d(${pill.left}px, ${pill.top}px, 0)`,
              width: pill.width,
              height: pill.height,
            }}
          />
          <ul className="nav-desktop-list flex items-center">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id} className="nav-desktop-item">
                <button
                  ref={setItemRef(id)}
                  type="button"
                  onClick={() => handleNavigate(id)}
                  className={`nav-link bg-transparent border-0 text-base py-1.5 ${
                    highlightId === id ? "nav-link-active" : ""
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <nav className="nav-mobile" aria-label="Primary">
          <ul className="flex items-center justify-evenly m-0 p-0 list-none w-full">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id} className="list-none p-0 m-0">
                <button
                  type="button"
                  onClick={() => handleNavigate(id)}
                  className={`nav-link-mobile bg-transparent border-0 ${
                    highlightId === id ? "nav-link-mobile-active" : ""
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
