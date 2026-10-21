import { useCallback, useEffect, useRef } from "react";

const RADIUS = 90;
const MAX_SCALE = 1.8;
const MIN_GAP = 2;

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scaleFor(distance) {
  const t = Math.max(0, Math.min(1, 1 - distance / RADIUS));
  const smooth = t * t * (3 - 2 * t);
  return 1 + (MAX_SCALE - 1) * smooth;
}

/**
 * Pointer-follow scale + collision push used by section ticks and project ticks.
 * @param {"x" | "y"} axis  "y" for a vertical rail, "x" for a horizontal rail
 */
export function useMagneticTicks(axis = "y") {
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const centersRef = useRef([]);
  const posRef = useRef(null);
  const rafRef = useRef(null);
  const reducedRef = useRef(prefersReducedMotion());

  const settle = useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    posRef.current = null;
    itemRefs.current.forEach((el) => {
      if (el) el.style.transform = "";
    });
  }, []);

  const apply = useCallback(() => {
    const pos = posRef.current;
    const items = itemRefs.current;
    if (pos == null || !items.length) return;

    const scales = centersRef.current.map((c) =>
      scaleFor(Math.abs(pos - c.center))
    );
    if (scales.every((s) => s <= 1.001)) return;

    const n = items.length;
    const half = centersRef.current.map((c, i) => c.half * scales[i]);
    const centers = centersRef.current.map((c) => c.center);

    for (let i = 1; i < n; i += 1) {
      const min = half[i - 1] + half[i] + MIN_GAP;
      const gap = centers[i] - centers[i - 1];
      if (gap < min) {
        const push = min - gap;
        for (let j = i; j < n; j += 1) centers[j] += push;
      }
    }
    for (let i = n - 2; i >= 0; i -= 1) {
      const min = half[i] + half[i + 1] + MIN_GAP;
      const gap = centers[i + 1] - centers[i];
      if (gap < min) {
        const push = min - gap;
        for (let j = i; j >= 0; j -= 1) centers[j] -= push;
      }
    }

    const isX = axis === "x";
    items.forEach((el, i) => {
      if (!el) return;
      const d = centers[i] - centersRef.current[i].center;
      el.style.transform = isX
        ? `translateX(${d}px) scale(${scales[i]})`
        : `translateY(${d}px) scale(${scales[i]})`;
    });
  }, [axis]);

  const schedule = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      apply();
    });
  }, [apply]);

  const measure = useCallback(() => {
    if (posRef.current != null) return;
    const isX = axis === "x";
    centersRef.current = itemRefs.current.map((el) => {
      if (!el) return { center: 0, half: 0 };
      const rect = el.getBoundingClientRect();
      return isX
        ? { center: rect.left + rect.width / 2, half: rect.width / 2 }
        : { center: rect.top + rect.height / 2, half: rect.height / 2 };
    });
  }, [axis]);

  useEffect(() => {
    measure();
    const ro =
      typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    if (navRef.current) ro?.observe(navRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [measure]);

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

  const onPointerEnter = () => {
    measure();
  };

  const onPointerMove = (event) => {
    posRef.current = axis === "x" ? event.clientX : event.clientY;
    if (reducedRef.current) return;
    schedule();
  };

  const onPointerLeave = () => settle();

  const setItemRef = (index) => (el) => {
    itemRefs.current[index] = el;
  };

  return {
    navRef,
    setItemRef,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
  };
}
