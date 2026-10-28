import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineExclamationCircle,
  HiOutlineRefresh,
  HiOutlineBookOpen,
  HiOutlineShare,
  HiCheck,
  HiArrowRight,
  HiExternalLink,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

export function getApiBaseUrl() {
  const raw = process.env.REACT_APP_API_BASE_URL ;

  return raw.replace(/\/+$/, "");
}

export function resolveMediaUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const base = getApiBaseUrl();
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function formatBlogDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function parseTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function unescapeMarkdownText(text) {
  if (!text) return "";
  return text.replace(/\\([!.\-+*#_[\]()\\`>])/g, "$1");
}

function renderInlineMarkdown(rawText) {
  if (!rawText) return null;
  const parts = [];
  // Match inline code `...`, bold **...**, links [label](url)
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = tokenRegex.exec(rawText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <React.Fragment key={`txt-${key++}`}>
          {unescapeMarkdownText(rawText.slice(lastIndex, match.index))}
        </React.Fragment>
      );
    }
    const token = match[0];
    if (token.startsWith("`") && token.endsWith("`")) {
      const codeContent = token.slice(1, -1).replace(/\\"/g, '"');
      parts.push(
        <code
          key={`code-${key++}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-100 border border-slate-200/90 text-indigo-700 text-[0.85em] font-medium"
        >
          {codeContent}
        </code>
      );
    } else if (token.startsWith("**") && token.endsWith("**")) {
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={`bold-${key++}`} className="font-bold text-slate-900">
          {renderInlineMarkdown(boldText)}
        </strong>
      );
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={`lnk-${key++}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 font-semibold"
          >
            {unescapeMarkdownText(linkMatch[1])}
          </a>
        );
      } else {
        parts.push(unescapeMarkdownText(token));
      }
    }
    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < rawText.length) {
    parts.push(
      <React.Fragment key={`txt-${key++}`}>
        {unescapeMarkdownText(rawText.slice(lastIndex))}
      </React.Fragment>
    );
  }

  return parts;
}

function isVideoAsset(url) {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

function MarkdownMediaBlock({ alt, src }) {
  const fullUrl = resolveMediaUrl(src);
  const caption = unescapeMarkdownText(alt);

  if (isVideoAsset(fullUrl)) {
    return (
      <figure className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-sm">
        <video
          src={fullUrl}
          controls
          playsInline
          preload="metadata"
          className="w-full max-h-[520px] object-contain bg-slate-950"
        >
          Your browser does not support the video tag.
        </video>
        {caption && (
          <figcaption
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="px-4 py-2.5 bg-slate-900 text-slate-300 text-xs border-t border-slate-800 flex items-center justify-between"
          >
            <span>{caption}</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Video Clip
            </span>
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
      <img
        src={fullUrl}
        alt={caption || "Blog illustration"}
        loading="lazy"
        className="w-full max-h-[540px] object-contain bg-slate-100"
      />
      {caption && (
        <figcaption
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          className="px-4 py-2.5 bg-white text-slate-500 text-xs border-t border-slate-200/80"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function BlogMarkdownRenderer({ content }) {
  const blocks = useMemo(() => {
    if (!content) return [];
    const lines = content.replace(/\r\n/g, "\n").split("\n");
    const result = [];
    let i = 0;

    while (i < lines.length) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();

      if (!trimmed) {
        i += 1;
        continue;
      }

      // Fenced code blocks
      if (trimmed.startsWith("```")) {
        const lang = trimmed.slice(3).trim();
        const codeLines = [];
        i += 1;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i += 1;
        }
        i += 1; // skip closing ```
        result.push({
          type: "code",
          lang,
          code: codeLines.join("\n"),
        });
        continue;
      }

      // Standalone media line: ![alt](url)
      const mediaMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (mediaMatch) {
        result.push({
          type: "media",
          alt: mediaMatch[1],
          src: mediaMatch[2],
        });
        i += 1;
        continue;
      }

      // Headings
      const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].replace(/^\*\*(.*)\*\*$/, "$1");
        result.push({
          type: "heading",
          level,
          text,
        });
        i += 1;
        continue;
      }

      // Unordered list items (* or -)
      if (/^[*-]\s+/.test(trimmed)) {
        const items = [];
        while (i < lines.length) {
          const line = lines[i];
          const lineTrim = line.trim();
          if (!lineTrim) {
            i += 1;
            break;
          }
          // Sub-bullet (indented)
          if (/^\s{2,}[*-]\s+/.test(line)) {
            const subText = lineTrim.replace(/^[*-]\s+/, "");
            if (items.length > 0) {
              items[items.length - 1].subItems.push(subText);
            } else {
              items.push({ text: subText, subItems: [] });
            }
            i += 1;
          } else if (/^[*-]\s+/.test(lineTrim)) {
            items.push({
              text: lineTrim.replace(/^[*-]\s+/, ""),
              subItems: [],
            });
            i += 1;
          } else {
            break;
          }
        }
        result.push({
          type: "list",
          items,
        });
        continue;
      }

      // Paragraph (collect consecutive non-special lines)
      const paraLines = [];
      while (i < lines.length) {
        const l = lines[i];
        const t = l.trim();
        if (
          !t ||
          t.startsWith("```") ||
          /^(#{1,4})\s+/.test(t) ||
          /^[*-]\s+/.test(t) ||
          /^!\[([^\]]*)\]\(([^)]+)\)$/.test(t)
        ) {
          break;
        }
        // Check if an inline image/video appears at the end of a paragraph line
        paraLines.push(t);
        i += 1;
      }

      if (paraLines.length > 0) {
        result.push({
          type: "paragraph",
          lines: paraLines,
        });
      }
    }

    return result;
  }, [content]);

  if (!blocks.length) return null;

  return (
    <div className="space-y-5 text-slate-700 leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 1 || block.level === 2) {
            return (
              <h2
                key={index}
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-6 pb-2 border-b border-slate-200 tracking-tight"
              >
                {renderInlineMarkdown(block.text)}
              </h2>
            );
          }
          return (
            <h3
              key={index}
              className="text-lg sm:text-xl font-extrabold text-slate-900 pt-4"
            >
              {renderInlineMarkdown(block.text)}
            </h3>
          );
        }

        if (block.type === "media") {
          return <MarkdownMediaBlock key={index} alt={block.alt} src={block.src} />;
        }

        if (block.type === "code") {
          return (
            <pre
              key={index}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm overflow-x-auto border border-slate-800 shadow-sm"
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-2.5 pl-1">
              {block.items.map((item, idx) => (
                <li key={idx} className="text-base text-slate-700 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2.5 shrink-0" />
                    <div className="flex-1">{renderInlineMarkdown(item.text)}</div>
                  </div>
                  {item.subItems.length > 0 && (
                    <ul className="mt-2 ml-6 space-y-1.5 border-l-2 border-indigo-100 pl-4">
                      {item.subItems.map((sub, sIdx) => (
                        <li
                          key={sIdx}
                          className="text-sm sm:text-base text-slate-600 leading-relaxed"
                        >
                          {renderInlineMarkdown(sub)}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "paragraph") {
          return (
            <div key={index} className="space-y-2">
              {block.lines.map((line, lIdx) => {
                const embeddedMedia = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                if (embeddedMedia) {
                  return (
                    <MarkdownMediaBlock
                      key={lIdx}
                      alt={embeddedMedia[1]}
                      src={embeddedMedia[2]}
                    />
                  );
                }
                return (
                  <p key={lIdx} className="text-base sm:text-[17px] text-slate-700 leading-relaxed">
                    {renderInlineMarkdown(line)}
                  </p>
                );
              })}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

function BlogsHeader() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />
      {/* Top Technical Status Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">Engineering Blog &amp; Notes</span>
            <span className="text-slate-500">·</span>
            <span>Divyanshu Soni</span>
          </div>
          <div
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400"
          >
            <span>divyanshusoni061@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-slate-900 group-hover:bg-indigo-600 transition-colors text-white font-extrabold text-sm flex items-center justify-center tracking-tight">
              DS
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 leading-none">
                Divyanshu Soni
              </div>
              <div
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-[11px] text-indigo-600 font-medium mt-1"
              >
                Python · Django · Celery
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Portfolio Home
            </Link>
            <Link
              to="/blogs"
              className="text-indigo-600 font-bold transition-colors"
            >
              Blogs
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <HiArrowLeft size={14} /> Portfolio
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
              href="https://drive.google.com/file/d/1DG-GgNwjYZfNuzGi1RcHKIijPtYj5qfa/view"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold items-center gap-1.5 transition-colors shadow-sm"
            >
              Resume PDF <HiExternalLink size={14} />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

/* ============================================================================
   BLOGS LISTING PAGE (/blogs)
   ============================================================================ */
export function BlogsListPage() {
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/portfolio/blogs`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs (HTTP ${response.status})`);
      }
      const data = await response.json();
      const list = Array.isArray(data) ? data : data?.results || [];
      setBlogs(list);
      setCount(typeof data?.count === "number" ? data.count : list.length);
    } catch (err) {
      setError(err.message || "Unable to load blogs from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-600 selection:text-white pb-24"
    >
      <BlogsHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-10">
        {/* Page Heading */}
        <section className="border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
            <HiOutlineBookOpen size={15} />
            <span>TECHNICAL ARTICLES &amp; WORKFLOWS</span>
          </div>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                Engineering <span className="text-indigo-600">Blogs</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl">
                Practical backend architecture notes, developer productivity setups, and
                production lessons learned building Python, Django, and Celery systems.
              </p>
            </div>
            {!loading && !error && (
              <span
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white"
              >
                {count} {count === 1 ? "ARTICLE" : "ARTICLES"}
              </span>
            )}
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div
            role="status"
            aria-label="Loading blogs"
            className="grid md:grid-cols-2 gap-6"
          >
            {[1, 2].map((skeleton) => (
              <div
                key={skeleton}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm p-6 space-y-4 animate-pulse"
              >
                <div className="aspect-[16/9] w-full rounded-2xl bg-slate-200" />
                <div className="h-4 w-1/3 bg-slate-200 rounded" />
                <div className="h-6 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-3xl border border-red-200 p-8 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <HiOutlineExclamationCircle size={26} />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Could not load blog posts
            </h2>
            <p className="text-sm text-slate-600">{error}</p>
            <button
              type="button"
              onClick={fetchBlogs}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
            >
              <HiOutlineRefresh size={16} /> Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm space-y-3">
            <h2 className="text-xl font-extrabold text-slate-900">No blog posts yet</h2>
            <p className="text-sm text-slate-600">
              Check back soon for new engineering articles and tutorials.
            </p>
          </div>
        )}

        {/* Blog Cards Grid */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => {
              const tags = parseTags(blog.tags);
              const dateDisplay = formatBlogDate(blog.published_at || blog.created_at);
              const bannerUrl = resolveMediaUrl(blog.banner_image);

              return (
                <article
                  key={blog.id || blog.slug}
                  className="group bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {bannerUrl && (
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="block aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100"
                      >
                        <img
                          src={bannerUrl}
                          alt={blog.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </Link>
                    )}

                    <div className="p-6 sm:p-7 space-y-4">
                      <div
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        className="flex flex-wrap items-center gap-3 text-xs text-slate-500"
                      >
                        {dateDisplay && (
                          <span className="inline-flex items-center gap-1.5">
                            <HiOutlineCalendar className="text-indigo-600" size={14} />
                            {dateDisplay}
                          </span>
                        )}
                        {blog.reading_time_minutes != null && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                            <HiOutlineClock size={13} />
                            {blog.reading_time_minutes} min read
                          </span>
                        )}
                      </div>

                      <Link to={`/blogs/${blog.slug}`} className="block">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                          {blog.title}
                        </h2>
                      </Link>

                      {blog.summary && (
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {blog.summary}
                        </p>
                      )}

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                              className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium inline-flex items-center gap-1"
                            >
                              <HiOutlineTag size={11} className="text-indigo-500" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <HiOutlineUser className="text-indigo-600" size={14} />
                      {blog.author || "Divyanshu Soni"}
                    </span>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-xs font-extrabold text-indigo-600 group-hover:text-indigo-800 inline-flex items-center gap-1.5"
                    >
                      Read Article
                      <HiArrowRight
                        size={14}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

/* ============================================================================
   BLOG DETAIL PAGE (/blogs/:slug)
   ============================================================================ */
export function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchBlogDetail = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${getApiBaseUrl()}/api/portfolio/blogs/${encodeURIComponent(slug)}/`
      );
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Blog post not found."
            : `Failed to fetch blog details (HTTP ${response.status})`
        );
      }
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      setError(err.message || "Unable to load blog post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      window.scrollTo?.(0, 0);
    } catch {
      // ignore in test environments
    }
    fetchBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const tags = parseTags(blog?.tags);
  const dateDisplay = formatBlogDate(blog?.published_at || blog?.created_at);
  const bannerUrl = resolveMediaUrl(blog?.banner_image);
  const topVideoUrl = resolveMediaUrl(blog?.video_url);

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-600 selection:text-white pb-24"
    >
      <BlogsHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Top Back Navigation */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <HiArrowLeft size={16} />
            Back to All Blogs
          </button>

          {blog && (
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 shadow-sm transition-colors"
            >
              {copiedLink ? (
                <>
                  <HiCheck className="text-emerald-600" size={15} />
                  <span className="text-emerald-700">Link Copied</span>
                </>
              ) : (
                <>
                  <HiOutlineShare size={15} />
                  <span>Share Article</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div
            role="status"
            aria-label="Loading blog post"
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6 animate-pulse"
          >
            <div className="h-4 w-40 bg-slate-200 rounded" />
            <div className="h-10 w-4/5 bg-slate-200 rounded" />
            <div className="aspect-[16/9] w-full rounded-2xl bg-slate-200" />
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-11/12 bg-slate-200 rounded" />
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-3xl border border-red-200 p-8 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <HiOutlineExclamationCircle size={26} />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">{error}</h1>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={fetchBlogDetail}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
              >
                <HiOutlineRefresh size={16} /> Retry
              </button>
              <Link
                to="/blogs"
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold"
              >
                All Blogs
              </Link>
            </div>
          </div>
        )}

        {/* Blog Article Content */}
        {!loading && !error && blog && (
          <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            {/* Article Header */}
            <div className="p-6 sm:p-10 border-b border-slate-100 space-y-5">
              <div
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className="flex flex-wrap items-center gap-3 text-xs text-slate-500"
              >
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                  <HiOutlineUser className="text-indigo-600" size={14} />
                  {blog.author || "Divyanshu Soni"}
                </span>
                {dateDisplay && (
                  <>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <HiOutlineCalendar className="text-indigo-600" size={14} />
                      {dateDisplay}
                    </span>
                  </>
                )}
                {blog.reading_time_minutes != null && (
                  <>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                      <HiOutlineClock size={13} />
                      {blog.reading_time_minutes} min read
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
                {blog.title}
              </h1>

              {blog.summary && (
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {blog.summary}
                </p>
              )}

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5"
                    >
                      <HiOutlineTag size={12} className="text-indigo-600" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Banner Image */}
            {bannerUrl && (
              <div className="bg-slate-950 border-b border-slate-200/80">
                <img
                  src={bannerUrl}
                  alt={blog.title}
                  className="w-full max-h-[480px] object-contain mx-auto"
                />
              </div>
            )}

            {/* Optional Top-level Video URL */}
            {topVideoUrl && (
              <div className="p-6 sm:px-10 pb-0">
                <video
                  src={topVideoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-950 max-h-[480px]"
                />
              </div>
            )}

            {/* Main Markdown Content */}
            <div className="p-6 sm:p-10">
              <BlogMarkdownRenderer content={blog.content} />
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-10 py-6 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Written By
                </div>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                  {blog.author || "Divyanshu Soni"} · Backend Software Engineer
                </div>
              </div>
              <Link
                to="/blogs"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
              >
                <HiArrowLeft size={14} /> More Articles
              </Link>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
