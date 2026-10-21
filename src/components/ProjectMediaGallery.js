import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function youtubeEmbedUrl(src) {
  if (!src) return null;
  if (src.includes("youtube.com/embed/")) return src;
  const watch = src.match(/[?&]v=([^&]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  const short = src.match(/youtu\.be\/([^?&]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  // bare id
  if (/^[\w-]{11}$/.test(src)) return `https://www.youtube.com/embed/${src}`;
  return src;
}

const DOTS_RADIUS = 56;
const DOTS_MAX_SCALE = 2.2;
const DOTS_MIN_GAP = 4;
const ACTIVE_BASE = 1.25;

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scaleFor(distance) {
  const t = Math.max(0, Math.min(1, 1 - distance / DOTS_RADIUS));
  const smooth = t * t * (3 - 2 * t);
  return 1 + (DOTS_MAX_SCALE - 1) * smooth;
}

function MediaItem({ item, projectName, active }) {
  if (!item) return null;

  if (item.type === "youtube") {
    const embed = youtubeEmbedUrl(item.src);
    return (
      <iframe
        className="project-media-frame"
        src={active ? embed : undefined}
        title={item.alt || `${projectName} video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  if (item.type === "video") {
    return (
      <video
        className="project-media-frame"
        src={item.src}
        poster={item.poster}
        controls
        playsInline
        preload={active ? "metadata" : "none"}
      >
        {item.alt || projectName}
      </video>
    );
  }

  // image (default)
  return (
    <img
      className="project-media-frame"
      src={item.src}
      alt={item.alt || `${projectName} screenshot`}
      draggable={false}
    />
  );
}

/**
 * Carousel for one project's images / videos.
 */
const ProjectMediaGallery = ({ media = [], projectName, direction = 0 }) => {
  const [index, setIndex] = useState(0);
  const count = media.length;

  const dotsHostRef = useRef(null);
  const dotRefs = useRef([]);
  const centersRef = useRef([]);
  const posXRef = useRef(null);
  const rafRef = useRef(null);
  const activeIndexRef = useRef(index);
  const reducedRef = useRef(prefersReducedMotion());

  useEffect(() => {
    setIndex(0);
  }, [media, projectName]);

  useEffect(() => {
    activeIndexRef.current = index;
  }, [index]);

  const go = useCallback(
    (dir) => {
      if (count <= 1) return;
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  const settle = useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    posXRef.current = null;
    dotRefs.current.forEach((el) => {
      if (el) el.style.transform = "";
    });
  }, []);

  const apply = useCallback(() => {
    const pos = posXRef.current;
    const dots = dotRefs.current;
    if (pos == null || !dots.length) return;

    const idx = activeIndexRef.current;
    const scales = centersRef.current.map((c, i) =>
      (i === idx ? ACTIVE_BASE : 1) * scaleFor(Math.abs(pos - (c.centerX || 0)))
    );

    const n = dots.length;
    const half = centersRef.current.map((c, i) => (c.w || 0) / 2 * scales[i]);
    const centersX = centersRef.current.map((c) => c.centerX || 0);

    for (let i = 1; i < n; i += 1) {
      const min = half[i - 1] + half[i] + DOTS_MIN_GAP;
      const gap = centersX[i] - centersX[i - 1];
      if (gap < min) {
        const push = min - gap;
        for (let j = i; j < n; j += 1) centersX[j] += push;
      }
    }
    for (let i = n - 2; i >= 0; i -= 1) {
      const min = half[i] + half[i + 1] + DOTS_MIN_GAP;
      const gap = centersX[i + 1] - centersX[i];
      if (gap < min) {
        const push = min - gap;
        for (let j = i; j >= 0; j -= 1) centersX[j] -= push;
      }
    }

    dots.forEach((el, i) => {
      if (!el) return;
      const dx = centersX[i] - (centersRef.current[i].centerX || 0);
      el.style.transform = `translateX(${dx}px) scale(${scales[i]})`;
    });
  }, []);

  const schedule = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      apply();
    });
  }, [apply]);

  const measure = useCallback(() => {
    centersRef.current = dotRefs.current.map((el) => {
      if (!el) return { centerX: 0, w: 0 };
      const rect = el.getBoundingClientRect();
      return { centerX: rect.left + rect.width / 2, w: rect.width };
    });
  }, []);

  useEffect(() => {
    if (count <= 1) return undefined;
    measure();
    const ro =
      typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    ro?.observe(dotsHostRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [count, measure]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      reducedRef.current = mq.matches;
      settle();
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [settle]);

  const onDotsMove = (event) => {
    posXRef.current = event.clientX;
    if (reducedRef.current) return;
    schedule();
  };

  const onDotsLeave = () => settle();

  const dirClass =
    direction > 0 ? "is-next" : direction < 0 ? "is-prev" : "";

  if (!count) {
    return (
      <div className="project-media-gallery-mask">
        <div
          key={projectName}
          className={`project-media-gallery project-slide-copy ${dirClass}`}
        >
          <div className="project-media-stage project-media-empty">
            <p className="text-portfolio-muted text-sm">No media yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-media-gallery-mask">
      <div
        key={projectName}
        className={`project-media-gallery project-slide-copy ${dirClass}`}
      >
        <div className="project-media-stage" aria-live="polite">
          <MediaItem
            item={media[index]}
            projectName={projectName}
            active
          />

          {count > 1 && (
            <>
              <button
                type="button"
                className="project-media-nav project-media-nav--prev"
                onClick={() => go(-1)}
                aria-label="Previous media"
              >
                <HiChevronLeft size={22} />
              </button>
              <button
                type="button"
                className="project-media-nav project-media-nav--next"
                onClick={() => go(1)}
                aria-label="Next media"
              >
                <HiChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div
            ref={dotsHostRef}
            className="project-media-dots"
            role="tablist"
            aria-label={`${projectName} media`}
            onPointerEnter={measure}
            onPointerMove={onDotsMove}
            onPointerLeave={onDotsLeave}
          >
            {media.map((item, i) => (
              <button
                key={`${projectName}-media-${i}`}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Media ${i + 1} of ${count}${
                  item.type === "video" || item.type === "youtube" ? " (video)" : ""
                }`}
                className={`project-media-dot ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectMediaGallery;