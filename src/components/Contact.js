import React, { useEffect, useRef, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlineDocumentText, HiOutlineMail } from "react-icons/hi";
import "../css/contact.css";
import SocialCard from "./social_icons";

const EMAIL = "divyanshusoni061@gmail.com";
const RESUME_VIEW_URL =
  "https://drive.google.com/file/d/1DG-GgNwjYZfNuzGi1RcHKIijPtYj5qfa/view";

function writeToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return Promise.reject(new Error("clipboard unavailable"));
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  if (!ok) throw new Error("copy failed");
}

const SOCIALS = [
  {
    label: "LinkedIn",
    handle: "divyanshusoni",
    href: "https://www.linkedin.com/in/divyanshusoni/",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    handle: "@divyanshusoni21",
    href: "https://github.com/divyanshusoni21",
    icon: FaGithub,
  },
  {
    label: "Instagram",
    handle: "@aman_soni21",
    href: "https://www.instagram.com/aman_soni21/",
    icon: FaInstagram,
  },
  {
    label: "X",
    handle: "@Divyanshus061",
    href: "https://x.com/Divyanshus061",
    icon: FaTwitter,
  },
];

const Contact = () => {
  const [copyState, setCopyState] = useState("idle");
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const markCopied = () => {
    setCopyState("copied");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyState("idle"), 2200);
  };

  const copyEmail = async () => {
    try {
      await writeToClipboard(EMAIL);
      markCopied();
    } catch {
      try {
        fallbackCopy(EMAIL);
        markCopied();
      } catch {
        setCopyState("error");
      }
    }
  };

  const copyTooltip =
    copyState === "copied"
      ? "Email copied"
      : copyState === "error"
        ? "Could not copy"
        : null;

  return (
    <section
      id="contact"
      data-section="contact"
      className="w-full md:min-h-[100dvh] bg-portfolio-bg flex flex-col"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1000px] mx-auto px-6 sm:px-8 flex flex-col justify-start sm:justify-center w-full flex-1 pt-[calc(var(--nav-height)+1rem)] pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="contact-heading" tabIndex={-1} className="section-title">
            Contact Me
          </h2>
        </div>

        <p className="text-2xl sm:text-3xl font-bold text-portfolio-ink mt-3 sm:mt-4 max-w-xl leading-snug">
          Let&apos;s have a chat.
        </p>
        <p className="text-portfolio-muted py-2 sm:py-3 max-w-[640px] leading-relaxed">
          I&apos;m a backend engineer open to roles, freelance work, and
          collaborations. Reach me by email or any of the channels below.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <SocialCard
              icon={HiOutlineMail}
              label="Email"
              handle={EMAIL}
              onClick={copyEmail}
              tooltip={copyTooltip}
              copied={copyState === "copied"}
              ariaLabel={`Copy email address ${EMAIL}`}
            />
            <SocialCard
              icon={HiOutlineDocumentText}
              label="Resume"
              handle="View PDF"
              href={RESUME_VIEW_URL}
              ariaLabel="View resume (opens in a new tab)"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {SOCIALS.map((social) => (
              <SocialCard key={social.label} {...social} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
