import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSectionScroll } from "./hooks/useSectionScroll";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
// import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SectionDots from "./components/SectionDots";
import DesignStudio from "./components/DesignStudio";
import { BlogsListPage, BlogDetailPage } from "./components/Blogs";

function PortfolioHome() {
  const { activeId, scrollToSection } = useSectionScroll();

  return (
    <DesignStudio>
      <a href="#main-scroll" className="skip-link">
        Skip to main content
      </a>
      <Navbar activeId={activeId} onNavigate={scrollToSection} />
      <SectionDots activeId={activeId} onNavigate={scrollToSection} />
      <main id="main-scroll" className="main-scroll">
        <Intro onNavigate={scrollToSection} />
        {/* <About /> */}
        <Projects />
        <Skills />
        <Contact />
      </main>
    </DesignStudio>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/blogs" element={<BlogsListPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
