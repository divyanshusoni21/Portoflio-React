import React from "react";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";

const CARD_CLASS =
  "group relative flex flex-col items-start gap-2 sm:gap-3 bg-portfolio-surface border border-portfolio-border rounded-xl p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:border-portfolio-green/40 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:transition-none duration-300 min-h-[44px] h-full w-full text-left appearance-none cursor-pointer";

const SocialCard = ({
  icon: Icon,
  href,
  label,
  handle,
  onClick,
  tooltip,
  copied,
  ariaLabel,
}) => {
  const TrailingIcon = onClick ? (copied ? FiCheck : FiCopy) : FiArrowUpRight;
  const trailingClass = copied
    ? "text-portfolio-green"
    : "text-portfolio-faint group-hover:text-portfolio-green transition-colors";

  const inner = (
    <>
      {tooltip ? (
        <span className="contact-tooltip" role="status">
          {tooltip}
        </span>
      ) : null}
      <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-portfolio-greenSoft text-portfolio-green">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="flex items-center gap-1 text-portfolio-ink font-semibold">
        {label}
        <TrailingIcon className={trailingClass} size={14} aria-hidden="true" />
      </span>
      <span className="text-xs text-portfolio-faint font-medium tracking-wide break-all">
        {handle}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={CARD_CLASS}
        aria-label={ariaLabel || `${label} — ${handle}`}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={CARD_CLASS}
      aria-label={
        ariaLabel || `${label} — ${handle} (opens in a new tab)`
      }
    >
      {inner}
    </a>
  );
};

export default SocialCard;
