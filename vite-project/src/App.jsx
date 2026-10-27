import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import ServicesHero from "./components/ServicesHero";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import CtaFooter from "./components/CtaFooter";
import ProjectDetail from "./components/ProjectDetail";

/* Reads the current URL path (no router dependency) so that a click on a
 * project card — /projects/<slug> — renders the project page instead of
 * the home page. popstate keeps the browser back button working. */
function usePathname() {
  const [path, setPath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname
  );

  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    window.addEventListener("app:pathname", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("app:pathname", sync);
    };
  }, []);

  return path;
}

export default function App() {
  const path = usePathname();
  const match = path.match(/^\/projects\/([^/]+)\/?$/);

  if (match) {
    return (
      <div className="relative min-h-screen bg-ink">
        <Navbar />
        <ProjectDetail slug={decodeURIComponent(match[1])} />
        <CtaFooter />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-ink">
      <Navbar />
      <Hero />
      <TrustStrip />
      <ServicesHero />
      <Projects />
      <Process />
      <Testimonials />
      <CtaFooter />
    </div>
  );
}
