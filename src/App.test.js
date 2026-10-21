import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

function mockMatchMedia(isDesktop) {
  window.matchMedia = (query) => ({
    matches: isDesktop && /min-width:\s*768px/.test(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

beforeEach(() => {
  mockMatchMedia(false);
});

test("renders portfolio name and main sections", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /divyanshu soni/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^projects$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^skills$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /contact me/i })).toBeInTheDocument();
});

test("mobile header shows inline links instead of a hamburger", () => {
  render(<App />);
  expect(screen.queryByRole("button", { name: /open menu/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /close menu/i })).not.toBeInTheDocument();

  const nav = screen.getByRole("navigation", { name: /primary/i });
  ["Intro", "Projects", "Skills", "Contact"].forEach((label) => {
    expect(within(nav).getByRole("button", { name: label })).toBeInTheDocument();
  });
  expect(screen.queryByRole("button", { name: /go to intro/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/^DS$/)).not.toBeInTheDocument();
});

test("desktop header centers primary nav items", () => {
  mockMatchMedia(true);
  render(<App />);
  const nav = screen.getByRole("navigation", { name: /primary/i });
  expect(nav.closest("header")?.className).toMatch(/justify-center/);
  expect(nav.closest("header")?.className).not.toMatch(/justify-between/);
});

test("mobile projects show one card at a time with pager next to the heading", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /yt vidclipper/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /dailystockhunt/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("tablist", { name: /select project/i })).not.toBeInTheDocument();
  expect(document.querySelector(".projects-panel--stack")).not.toBeNull();
  expect(document.querySelector(".project-slide-meta .project-nav-btn")).toBeNull();

  const chrome = document.querySelector(".projects-chrome");
  expect(chrome).not.toBeNull();
  const prev = within(chrome).getByRole("button", { name: /previous project/i });
  const next = within(chrome).getByRole("button", { name: /next project/i });
  expect(prev).toBeDisabled();
  expect(next).toBeEnabled();
  expect(within(chrome).getByText(/01\s*\/\s*06/i)).toBeInTheDocument();

  fireEvent.click(next);
  expect(screen.getByRole("heading", { name: /dailystockhunt/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /yt vidclipper/i })).not.toBeInTheDocument();
  expect(
    within(document.querySelector(".projects-chrome")).getByRole("button", {
      name: /previous project/i,
    })
  ).toBeEnabled();
});

test("desktop project arrows sit on the details pager, with labeled CTAs", () => {
  mockMatchMedia(true);
  render(<App />);
  expect(document.querySelector(".projects-panel--stack")).toBeNull();
  expect(screen.queryByRole("tablist", { name: /select project/i })).not.toBeInTheDocument();
  expect(document.querySelector(".projects-chrome .project-nav-btn")).toBeNull();

  const meta = document.querySelector(".project-slide-meta");
  expect(meta).not.toBeNull();
  const prev = within(meta).getByRole("button", { name: /previous project/i });
  const next = within(meta).getByRole("button", { name: /next project/i });
  expect(prev).toBeDisabled();
  expect(next).toBeEnabled();

  expect(screen.getByRole("heading", { name: /yt vidclipper/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /visit site/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view code/i })).toBeInTheDocument();
  expect(screen.getByText(/01\s*\/\s*06/i)).toBeInTheDocument();
});

test("skills section groups the stack and drops C", () => {
  render(<App />);
  const region = screen.getByRole("region", { name: /skills/i });

  ["Backend", "Frontend", "Infra", "AI & LLM"].forEach((label) => {
    expect(within(region).getByRole("heading", { name: label })).toBeInTheDocument();
  });

  [
    "Python",
    "Django / DRF",
    "PostgreSQL",
    "React",
    "JavaScript",
    "HTML / CSS",
    "Docker",
    "Nginx",
    "Linux",
    "OpenAI / Gemini",
    "RAG",
    "GraphQL",
  ].forEach((label) => {
    expect(within(region).getByText(label)).toBeInTheDocument();
  });

  expect(within(region).queryByText(/^C$/)).not.toBeInTheDocument();
});

test("contact section exposes email and resume actions", async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });

  render(<App />);
  const region = screen.getByRole("region", { name: /contact me/i });

  fireEvent.click(within(region).getByRole("button", { name: /copy email address/i }));
  expect(writeText).toHaveBeenCalledWith("divyanshusoni061@gmail.com");
  expect(await within(region).findByText(/email copied/i)).toBeInTheDocument();

  const resume = within(region).getByRole("link", { name: /view resume/i });
  expect(resume).toHaveAttribute(
    "href",
    "https://drive.google.com/file/d/1DG-GgNwjYZfNuzGi1RcHKIijPtYj5qfa/view"
  );
  expect(resume).toHaveAttribute("target", "_blank");
});

test("renders section navigation ticks", () => {
  render(<App />);
  const nav = screen.getByRole("navigation", {
    name: /section navigation/i,
    hidden: true,
  });
  expect(nav).toBeInTheDocument();
  ["Intro", "Skills", "Projects", "Contact"].forEach((label) => {
    expect(
      within(nav).getByRole("button", { name: label, hidden: true })
    ).toBeInTheDocument();
  });
});
