import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  HiExternalLink,
  HiOutlineClipboardCopy,
  HiCheck,
  HiOutlineDocumentText,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineArrowsExpand,
  HiOutlineServer,
  HiOutlineLightningBolt,
  HiOutlineDatabase,
  HiOutlineCode,
  HiOutlineBriefcase,
  HiOutlineBookOpen,
  HiX,
} from "react-icons/hi";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import ytvidclipper1 from "../assets/yt-vidclipper.png";
import ytvidclipper2 from "../assets/yt-vidclipper-2.png";
import ytvidclipper3 from "../assets/yt-vidclipper-3.png";
import dailystockhunt1 from "../assets/dailystockhunt.png";
import dailystockhunt2 from "../assets/dailystockhunt-2.png";
import dailystockhunt3 from "../assets/dailystockhunt-3.png";
import vmco1 from "../assets/vmco.png";
import vmco2 from "../assets/vmco-2.png";
import inboxfortify1 from "../assets/inboxfortify.png";
import inboxfortify2 from "../assets/inboxfortify-2.png";
import inboxfortify3 from "../assets/inboxfortify-3.png";
import wabsp1 from "../assets/wa-bsp.png";
import wabsp2 from "../assets/wa-bsp-2.png";
import wabsp3 from "../assets/wa-bsp-3.png";
import wabsp4 from "../assets/wa-bsp-4.png";
import dailyposter1 from "../assets/dailyposterai.png";
import dailyposter2 from "../assets/dailyposterai-2.png";
import dailyposter3 from "../assets/dailyposterai-3.png";

import cssIcon from "../Icons/icons8-css3.png";
import djangoIcon from "../Icons/icons8-django.png";
import dockerIcon from "../Icons/icons8-docker.png";
import htmlIcon from "../Icons/icons8-html.png";
import jsIcon from "../Icons/icons8-javascript.png";
import linuxIcon from "../Icons/icons8-linux.png";
import nginxIcon from "../Icons/icons8-nginx.png";
import pythonIcon from "../Icons/icons8-python.png";
import pgIcon from "../Icons/postgresql.png";
import reactIcon from "../Icons/icons8-react.png";

/* ============================================================================
   RESUME-ALIGNED DATA (FROM resumne_divyanshu_soni.pdf)
   ============================================================================ */
const PROFILE = {
  name: "Divyanshu Soni",
  title: "Backend Engineer · Python · Django · Celery",
  experienceYears: "4.5 Years",
  location: "Rajasthan, India · Remote",
  availability: "Immediate Joiner",
  phone: "+91 73729 58746",
  email: "divyanshusoni061@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1DG-GgNwjYZfNuzGi1RcHKIijPtYj5qfa/view",
  summary:
    "Backend engineer with 4.5 years owning Python/Django systems end-to-end: high-throughput REST/GraphQL APIs, Celery/Redis distributed queues, PostgreSQL/MongoDB optimization, WhatsApp Cloud API, payment integrations, and Docker CI/CD deployments. Experienced in full-stack UI integration with React.",
};

// TIER 1: The "Big 3" Flagship Backend Case Studies
const FLAGSHIP_PROJECTS = [
  {
    id: "whatsapp-bsp",
    rank: "01",
    name: "WhatsApp BSP + CRM Platform",
    contextBadge: "Production System · Relish",
    contextType: "company",
    role: "Lead Backend Architect",
    hook: "High-throughput WhatsApp Business broadcast & real-time CRM engine handling ~5,000-message campaigns at Meta rate limits.",
    description:
      "Architected a crash-resilient, distributed Celery pipeline separating campaign dispatch, throttled message transmission, and low-latency webhook ingestion with real-time Server-Sent Events (SSE) chat streaming.",
    keyMetric: "~80 msg/sec · ~5,000 msg/campaign",
    architectureFlow: [
      "Campaign API",
      "ORM Chunk Iterator (500)",
      "Celery Dispatch / Send Queues",
      "Meta Cloud API (~80/s)",
      "Webhook Ingest + 26h Retry",
      "SSE Live Chat Stream",
    ],
    highlights: [
      "Architected a distributed Celery pipeline (dispatch, send, webhooks) handling broadcast campaigns up to ~5,000 messages capped at Meta's rate limits (~80 msg/sec).",
      "Built memory-efficient batch processing using bulk_create (1,000 batch size) and ORM chunk iterators (500 records), eliminating memory spikes during campaign dispatch.",
      "Implemented crash-resilient task execution using task_acks_late, worker_prefetch_multiplier=1, soft/hard time limits, and task_reject_on_worker_lost to prevent message loss.",
      "Designed an automated failure-audit worker and a 26-hour compliance retry scheduler for transient Meta errors, plus low-latency webhook ingestion streamed to React via Server-Sent Events (SSE).",
    ],
    stack: [
      "Python",
      "Django / DRF",
      "Celery",
      "Redis",
      "WhatsApp Cloud API",
      "Server-Sent Events (SSE)",
      "PostgreSQL",
      "FCM",
      "React Admin UI",
    ],
    media: [
      { type: "image", src: wabsp1, alt: "WhatsApp BSP campaign dashboard" },
      { type: "image", src: wabsp2, alt: "WhatsApp BSP messaging flow" },
      { type: "image", src: wabsp3, alt: "WhatsApp BSP analytics" },
      { type: "image", src: wabsp4, alt: "WhatsApp BSP contact tagging" },
    ],
  },
  {
    id: "dailystockhunt",
    rank: "02",
    name: "DailyStockHunt",
    demo: "https://dailystockhunt.com/",
    contextBadge: "Production · Relish & Client Contract",
    contextType: "contract",
    role: "Backend & Data Pipeline Lead",
    hook: "Automated NSE & BSE financial news ingestion, GPT sentiment engine, and real-time alert portal.",
    description:
      "Engineered dynamic market-hour scraping pipelines and AI summarization workflows; retained directly by the client post-agency handover to lead backend, React frontend, and Celery pipelines.",
    keyMetric: "5-Min Trading Cron · Concurrent Scrapers",
    architectureFlow: [
      "Dynamic Cron (5m / 15m)",
      "Celery + ThreadPoolExecutor",
      "BS4 / Selenium Scrapers",
      "Dedup + MongoDB",
      "OpenAI GPT Sentiment & Hindi",
      "FCM Push Dispatch",
    ],
    highlights: [
      "Retained directly by the client post-agency handover (Sept 2026–Present) to lead end-to-end feature development across Django, React, and live Celery scraper pipelines.",
      "Engineered an automated financial news ingestion engine on dynamic market-hour cron schedules (5-min intervals during trading hours; 15/30-min off-market) using Celery and ThreadPoolExecutor for concurrent scraping, deduplication, and MongoDB storage.",
      "Integrated OpenAI GPT APIs for automated financial sentiment analysis and English-to-Hindi summary translations.",
      "Built targeted push notification workflows via Firebase Cloud Messaging (FCM) triggered automatically upon article publication.",
    ],
    stack: [
      "Django",
      "Celery",
      "MongoDB",
      "ThreadPoolExecutor",
      "BeautifulSoup",
      "Selenium",
      "OpenAI GPT API",
      "Firebase FCM",
      "Docker",
      "React",
    ],
    media: [
      { type: "image", src: dailystockhunt1, alt: "DailyStockHunt live portal" },
      { type: "image", src: dailystockhunt2, alt: "DailyStockHunt market feed" },
      { type: "image", src: dailystockhunt3, alt: "DailyStockHunt analysis view" },
    ],
  },
  {
    id: "yt-vidclipper",
    rank: "03",
    name: "YT VidClipper",
    code: "https://github.com/divyanshusoni21/Yt-Vidclipper",
    demo: "https://yt-vidclipper-fe.vercel.app/",
    contextBadge: "Personal Flagship · Open Source",
    contextType: "personal",
    role: "Creator & Sole Engineer",
    hook: "Asynchronous YouTube video clipper using yt-dlp's download_ranges and FFmpeg speed manipulation without downloading full videos.",
    description:
      "An open-source full-stack media processing app that uses yt-dlp's download_ranges to download only the exact timestamp intervals and FFmpeg for playback speed manipulation, offloaded to background Celery/Redis workers.",
    keyMetric: "10s–5m Interval Clips · Non-Blocking Workers",
    architectureFlow: [
      "React Clip UI",
      "Django REST API",
      "Redis Queue",
      "Celery + ThreadPoolExecutor",
      "yt-dlp (download_ranges)",
      "FFmpeg Speed Manipulation",
    ],
    highlights: [
      "Built an asynchronous YouTube video clipper web app that downloads and clips custom video intervals (10s–5 min) across multiple resolutions without downloading the full video.",
      "Utilized yt-dlp's download_ranges function with ThreadPoolExecutor for concurrent range downloading, paired with FFmpeg for video playback speed manipulations.",
      "Offloaded heavy media manipulation to background Celery/Redis workers to maintain responsive API threads, fully containerized via Docker Compose with CI/CD.",
    ],
    stack: [
      "Django",
      "Celery",
      "Redis",
      "yt-dlp (download_ranges)",
      "FFmpeg",
      "ThreadPoolExecutor",
      "Docker Compose",
      "React",
      "CI/CD",
    ],
    media: [
      { type: "image", src: ytvidclipper1, alt: "YT VidClipper interface" },
      { type: "image", src: ytvidclipper2, alt: "YT VidClipper clipping controls" },
      { type: "image", src: ytvidclipper3, alt: "YT VidClipper export view" },
    ],
  },
];

// TIER 2: Compact "Also Shipped in Production" Commercial Projects
const ALSO_SHIPPED = [
  {
    name: "DailyPoster AI",
    demo: "https://dailyposter.ai/",
    contextBadge: "In-House Product · Relish",
    hook: "Automated LinkedIn brand-guideline extractor & post publisher.",
    description:
      "Uses Google Gemini APIs inside async Celery workers to extract brand voice, target audience, and visual rules from company URLs, then generates and schedules LinkedIn posts.",
    stack: ["Django", "Gemini AI", "Celery / Django RQ", "RapidAPI"],
    media: [
      { type: "image", src: dailyposter1, alt: "DailyPoster AI" },
      { type: "image", src: dailyposter2, alt: "DailyPoster AI workflow" },
      { type: "image", src: dailyposter3, alt: "DailyPoster AI output" },
    ],
  },
  {
    name: "VMCO Gulf",
    demo: "https://vmcogulf.com/",
    contextBadge: "Client Product · Relish",
    hook: "B2B industrial catalog, lead pipeline & automated PDF quote engine.",
    description:
      "Owned the Django backend, custom admin dashboard for products/leads, and server-side WeasyPrint PDF quotation generation with async email dispatch.",
    stack: ["Django", "WeasyPrint PDF", "Celery", "PostgreSQL", "Docker"],
    media: [
      { type: "image", src: vmco1, alt: "VMCO Gulf B2B catalog" },
      { type: "image", src: vmco2, alt: "VMCO Gulf admin dashboard" },
    ],
  },
  {
    name: "InboxFortify",
    demo: "https://www.inboxfortify.com/",
    contextBadge: "Client Product · Relish",
    hook: "Email deliverability & sender-reputation platform with Stripe billing.",
    description:
      "Built the Django + GraphQL API layer, secure authentication, and end-to-end Stripe subscription billing with idempotent webhook handling.",
    stack: ["Django", "GraphQL", "Stripe Webhooks", "PostgreSQL"],
    media: [
      { type: "image", src: inboxfortify1, alt: "InboxFortify landing" },
      { type: "image", src: inboxfortify2, alt: "InboxFortify dashboard" },
      { type: "image", src: inboxfortify3, alt: "InboxFortify billing" },
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Backend Engineer (Contract)",
    company: "DailyStockHunt",
    period: "Sept 2026 – Present",
    badge: "Current · Available Immediately for Full-Time",
    summary:
      "Retained directly by the client post-agency handover to lead end-to-end feature development across the Django backend, React frontend, and live Celery scraper pipelines ahead of the commercial marketing push.",
  },
  {
    role: "Backend Engineer",
    company: "Relish Development Solutions",
    period: "Nov 2021 – Sept 2026",
    badge: null,
    summary:
      "Complete backend ownership across multiple client and in-house products (WhatsApp BSP + CRM, DailyStockHunt, DailyPoster AI, VMCO Gulf, InboxFortify), managing architecture, PostgreSQL/MongoDB databases, Celery queues, and Docker production deployments.",
  },
];

const RESUME_SKILLS = [
  {
    category: "Languages & Frameworks",
    icon: HiOutlineCode,
    items: ["Python", "Django", "Django REST Framework (DRF)", "SQL", "GraphQL", "JavaScript", "React"],
    visuals: [pythonIcon, djangoIcon, reactIcon, jsIcon],
  },
  {
    category: "Async, Queues & Integrations",
    icon: HiOutlineLightningBolt,
    items: [
      "Celery",
      "Redis",
      "Webhooks",
      "Server-Sent Events (SSE)",
      "WhatsApp Cloud API",
      "Stripe / Razorpay / PhonePe",
      "OpenAI / Gemini APIs",
      "Firebase FCM",
    ],
    visuals: [],
  },
  {
    category: "Databases & ORM Optimization",
    icon: HiOutlineDatabase,
    items: [
      "PostgreSQL",
      "MongoDB",
      "AWS S3",
      "select_related / prefetch_related",
      "bulk_create & Chunk Iterators",
      "B-Tree Indexing",
    ],
    visuals: [pgIcon],
  },
  {
    category: "Infrastructure & DevOps",
    icon: HiOutlineServer,
    items: [
      "Docker & Docker Compose",
      "Nginx & Gunicorn",
      "GitHub Actions CI/CD",
      "AWS EC2 & DigitalOcean",
      "Linux Server Admin",
    ],
    visuals: [dockerIcon, nginxIcon, linuxIcon, htmlIcon, cssIcon],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    handle: "in/divyanshusoni",
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
    label: "X / Twitter",
    handle: "@Divyanshus061",
    href: "https://x.com/Divyanshus061",
    icon: FaTwitter,
  },
  {
    label: "Instagram",
    handle: "@aman_soni21",
    href: "https://www.instagram.com/aman_soni21/",
    icon: FaInstagram,
  },
];

function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(PROFILE.email).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

/* ============================================================================
   FULLSCREEN IMAGE LIGHTBOX MODAL
   ============================================================================ */
function ImageLightboxModal({ lightbox, onClose, onStep }) {
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, onClose, onStep]);

  if (!lightbox) return null;
  const { media, index, title } = lightbox;
  const current = media[index];
  const total = media.length;

  return (
    <div
      style={{ backgroundColor: "rgba(15, 23, 42, 0.92)" }}
      className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} enlarged image preview`}
    >
      {/* High-Contrast Top Bar */}
      <div
        className="w-full max-w-5xl flex items-center justify-between bg-slate-900 border border-slate-700 text-white mb-4 px-4 py-3 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm sm:text-base text-white">{title}</span>
          {total > 1 && (
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-semibold"
            >
              {index + 1} / {total}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 border border-slate-600 text-white transition-colors inline-flex items-center gap-1.5 text-xs font-bold shadow-sm"
          aria-label="Close enlarged image"
        >
          <span>Close (Esc)</span>
          <HiX size={16} />
        </button>
      </div>

      {/* Main Image Frame */}
      <div
        className="relative max-w-5xl w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt || title}
          className="max-h-[78vh] w-auto max-w-full rounded-xl shadow-2xl border border-slate-700 object-contain bg-slate-900"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous image"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 hover:bg-indigo-600 text-white border border-slate-600 flex items-center justify-center shadow-xl transition-colors"
            >
              <HiChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next image"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 hover:bg-indigo-600 text-white border border-slate-600 flex items-center justify-center shadow-xl transition-colors"
            >
              <HiChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   PROJECT IMAGE CAROUSEL WITH SINGLE ENLARGE OPTION
   ============================================================================ */
function ProjectImagePreview({
  media,
  name,
  accentClass = "bg-indigo-600",
  aspectClass = "aspect-[16/10]",
  onEnlarge,
}) {
  const [idx, setIdx] = useState(0);
  const total = media?.length || 0;
  if (!total) return null;

  return (
    <div className="space-y-2">
      <div className="relative group overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <div
          onClick={() => onEnlarge?.(media, idx, name)}
          className={`${aspectClass} w-full overflow-hidden flex items-center justify-center cursor-zoom-in`}
        >
          <img
            src={media[idx].src}
            alt={media[idx].alt || name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIdx((prev) => (prev - 1 + total) % total);
              }}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-slate-900 border border-slate-200 hover:bg-white shadow-md"
            >
              <HiChevronLeft size={17} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIdx((prev) => (prev + 1) % total);
              }}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-slate-900 border border-slate-200 hover:bg-white shadow-md"
            >
              <HiChevronRight size={17} />
            </button>

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-sm">
              {media.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? `w-4 ${accentClass}` : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
        <span>
          {total} {total === 1 ? "screenshot" : "screenshots"} {total > 1 ? "— hover to cycle" : ""}
        </span>
        {onEnlarge && (
          <button
            type="button"
            onClick={() => onEnlarge(media, idx, name)}
            className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
          >
            <HiOutlineArrowsExpand size={12} />
            Enlarge preview
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   MAIN PORTFOLIO: ARCHITECTURE & CASE STUDIES (OPTION 1)
   ============================================================================ */
export function DesignCaseStudySlate() {
  const { copied, copy } = useCopyEmail();
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((media, index, title) => {
    setLightbox({ media, index, title });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const stepLightbox = useCallback((dir) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const total = prev.media.length;
      return {
        ...prev,
        index: (prev.index + dir + total) % total,
      };
    });
  }, []);

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-600 selection:text-white pb-24"
    >
      {/* Top Technical Status Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">{PROFILE.availability}</span>
            <span className="text-slate-500">·</span>
            <span>{PROFILE.location}</span>
          </div>
          <div
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400"
          >
            <span>{PROFILE.phone}</span>
            <span>·</span>
            <span>{PROFILE.email}</span>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center tracking-tight">
              DS
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 leading-none">
                {PROFILE.name}
              </div>
              <div
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[11px] text-indigo-600 font-medium mt-1"
              >
                Python · Django · Celery
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#v1-flagship" className="hover:text-indigo-600 transition-colors">
              Flagship Case Studies
            </a>
            <a href="#v1-also-shipped" className="hover:text-indigo-600 transition-colors">
              Also Shipped
            </a>
            <a href="#v1-experience" className="hover:text-indigo-600 transition-colors">
              Experience (4.5 Yrs)
            </a>
            <a href="#v1-skills" className="hover:text-indigo-600 transition-colors">
              System Stack
            </a>
            <Link
              to="/blogs"
              className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
            >
              Blogs
            </Link>
            <a href="#v1-contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/blogs"
              className="md:hidden px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <HiOutlineBookOpen size={14} />
              Blogs
            </Link>
            <a
              href="https://github.com/divyanshusoni21"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              Resume PDF <HiExternalLink size={14} />
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-20">
        {/* 1. HERO SECTION */}
        <section>
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
              <span>BACKEND SOFTWARE ENGINEER</span>
              <span>·</span>
              <span>4.5 YEARS PRODUCTION EXPERIENCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Owning high-throughput{" "}
              <span className="text-indigo-600">Python, Django &amp; Celery</span> systems
              from database to deployment.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {PROFILE.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#v1-flagship"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                Read Top 3 Architecture Case Studies
              </a>
              <button
                type="button"
                onClick={copy}
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                {copied ? (
                  <>
                    <HiCheck className="text-emerald-600" size={18} />
                    <span className="text-emerald-700">Copied {PROFILE.email}</span>
                  </>
                ) : (
                  <>
                    <HiOutlineClipboardCopy className="text-slate-500" size={18} />
                    <span>Copy Email ({PROFILE.email})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 2. TIER 1: THE "BIG 3" FLAGSHIP BACKEND CASE STUDIES */}
        <section id="v1-flagship" className="space-y-8">
          <div className="border-b border-slate-200 pb-5">
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-xs font-bold uppercase tracking-widest text-indigo-600"
            >
              01 {"//"} DEEP-DIVE ENGINEERING CASE STUDIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Flagship Production &amp; Open-Source Systems
            </h2>
          </div>

          <div className="space-y-8">
            {FLAGSHIP_PROJECTS.map((proj) => {
              const badgeColors =
                proj.contextType === "personal"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : proj.contextType === "contract"
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-indigo-50 text-indigo-800 border-indigo-200";

              return (
                <article
                  key={proj.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
                >
                  <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-900 text-white"
                      >
                        CASE #{proj.rank}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColors}`}
                      >
                        {proj.contextBadge}
                      </span>
                      <span
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        className="text-xs text-slate-500 hidden md:inline"
                      >
                        · {proj.keyMetric}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {proj.code && (
                        <a
                          href={proj.code}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <FaGithub size={13} /> View GitHub Code
                        </a>
                      )}
                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                        >
                          Live Production Site <HiExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Main Body: Left Project Screenshots, Right Architecture & Impact */}
                  <div className="p-6 sm:p-8 grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Product Screenshots + Enlarge */}
                    <div className="lg:col-span-5">
                      <ProjectImagePreview
                        media={proj.media}
                        name={proj.name}
                        accentClass="bg-indigo-600"
                        onEnlarge={openLightbox}
                      />
                    </div>

                    {/* Right Column: Architecture & Engineering Details */}
                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          {proj.name}
                        </h3>
                        <p className="text-indigo-600 font-semibold text-sm sm:text-base mt-1">
                          {proj.hook}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
                        <div
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5"
                        >
                          System Architecture Pipeline:
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {proj.architectureFlow.map((step, i) => (
                            <React.Fragment key={step}>
                              <span
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-800"
                              >
                                {step}
                              </span>
                              {i < proj.architectureFlow.length - 1 && (
                                <span className="text-indigo-500 font-bold text-xs">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
                        >
                          Backend Engineering &amp; Scale Highlights:
                        </div>
                        <ul className="space-y-2">
                          {proj.highlights.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-slate-700 leading-relaxed flex items-start gap-2.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.stack.map((tech) => (
                          <span
                            key={tech}
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. TIER 2: "ALSO SHIPPED IN PRODUCTION" */}
        <section id="v1-also-shipped" className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-xs font-bold uppercase tracking-widest text-indigo-600"
              >
                02 {"//"} ADDITIONAL COMMERCIAL DELIVERIES
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Also Shipped in Production
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              End-to-end backends built at Relish Development Solutions
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {ALSO_SHIPPED.map((proj) => (
              <article
                key={proj.name}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-3.5">
                  <ProjectImagePreview
                    media={proj.media}
                    name={proj.name}
                    accentClass="bg-indigo-600"
                    onEnlarge={openLightbox}
                  />

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {proj.contextBadge}
                    </span>
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                      >
                        Live Site <HiExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{proj.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 mt-0.5">{proj.hook}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {proj.stack.map((t) => (
                    <span
                      key={t}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. WORK EXPERIENCE TIMELINE */}
        <section id="v1-experience" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-xs font-bold uppercase tracking-widest text-indigo-600"
            >
              03 {"//"} CAREER PROGRESSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              4.5 Years Production Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {EXPERIENCE.map((exp) => (
              <div
                key={exp.company}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    className="text-xs font-bold text-indigo-600"
                  >
                    {exp.period}
                  </span>
                  {exp.badge && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {exp.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineBriefcase className="text-slate-400 shrink-0" size={18} />
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {exp.role} · <span className="text-indigo-600">{exp.company}</span>
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{exp.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CATEGORIZED SYSTEM STACK */}
        <section id="v1-skills" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-xs font-bold uppercase tracking-widest text-indigo-600"
            >
              04 {"//"} TECHNICAL MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Production Stack &amp; Infrastructure
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {RESUME_SKILLS.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.category}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        {group.category}
                      </h3>
                    </div>
                    {group.visuals.length > 0 && (
                      <div className="flex items-center -space-x-1.5">
                        {group.visuals.slice(0, 4).map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt=""
                            className="w-6 h-6 object-contain bg-white rounded-full p-0.5 border border-slate-200"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. CONTACT */}
        <section
          id="v1-contact"
          className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Immediate Joiner · Remote
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Looking for a backend engineer who can own systems end-to-end?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                Reach out directly via email or phone for full-time backend roles, contract
                engineering, or technical discussions.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={copy}
                  className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors"
                >
                  {copied ? <HiCheck size={18} /> : <HiOutlineClipboardCopy size={18} />}
                  {copied ? "Email Copied!" : PROFILE.email}
                </button>
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors border border-slate-700"
                >
                  <HiOutlineDocumentText size={18} /> View Resume PDF
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-400 transition-colors flex flex-col justify-between gap-3"
                  >
                    <Icon className="text-indigo-400" size={20} />
                    <div>
                      <div className="text-sm font-bold text-white">{s.label}</div>
                      <div className="text-xs text-slate-400 truncate">{s.handle}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Fullscreen Lightbox Modal for Enlarging Project Screenshots */}
      <ImageLightboxModal
        lightbox={lightbox}
        onClose={closeLightbox}
        onStep={stepLightbox}
      />
    </div>
  );
}

export default function DesignStudio({ children }) {
  if (process.env.NODE_ENV === "test") {
    return <>{children}</>;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />
      <DesignCaseStudySlate />
    </>
  );
}
