import HeroBackdrop from "./HeroBackdrop";
import { useTypewriter } from "../hooks/useTypewriter";

const PHRASES = ["deliver results.", "build trust.", "drive growth."];
const LONGEST = PHRASES.reduce((a, b) => (b.length > a.length ? b : a), "");

function Typed() {
  const typed = useTypewriter(PHRASES);
  return (
    <span className="relative inline-flex align-baseline whitespace-pre">
      <span aria-hidden="true" className="invisible font-bold">
        {LONGEST}
        <span className="font-normal">|</span>
      </span>
      <span className="sr-only">{PHRASES.join(", ")}</span>
      <span aria-hidden="true" className="absolute left-0 top-0 font-bold text-brand">
        {typed}
        <span className="animate-blink font-normal">|</span>
      </span>
    </span>
  );
}

const ARROW = (
  <span aria-hidden="true" className="text-sm leading-none">
    &#8594;
  </span>
);

export default function Hero() {
  return (
    <>
      {/* ---------------------------- Mobile ---------------------------- */}
      <section className="relative flex min-h-[80svh] flex-col overflow-hidden bg-dark-bg text-[#fafafa] lg:hidden">
        <HeroBackdrop />

        <div className="container-wide relative z-10 flex flex-1 flex-col justify-center pb-10 pt-28">
          <h1
            className="hero-stagger font-display text-[clamp(2.55rem,10.5vw,3.7rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white"
            style={{ animationDelay: "150ms" }}
          >
            We build modern brands &amp; digital experiences.
          </h1>

          <p className="hero-stagger mt-5 font-display text-[clamp(1.1rem,4.4vw,1.55rem)] font-medium tracking-[-0.01em] text-white/55">
            Designed to <Typed />
          </p>

          <p
            className="hero-stagger mt-6 max-w-[34ch] font-body text-[0.92rem] leading-[1.55] text-white/45"
            style={{ animationDelay: "450ms" }}
          >
            Brands that hold their own.
            <br />
            Websites that pull their weight.
          </p>

          <div
            className="hero-stagger mt-8 flex items-center gap-5"
            style={{ animationDelay: "600ms" }}
          >
            <a
              href="#"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand pl-4 pr-3.5 font-display text-[0.82rem] font-semibold text-white shadow-[0_8px_24px_rgba(224,27,36,0.26)] transition-colors hover:bg-red-dark"
            >
              Start a project
              {ARROW}
            </a>

            <a
              href="#"
              className="group inline-flex items-center gap-1.5 font-display text-[0.82rem] font-medium text-white/60 transition-colors hover:text-white"
            >
              See our work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                &#8594;
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------- Desktop --------------------------- */}
      <section className="relative hidden min-h-screen flex-col overflow-hidden bg-dark-bg text-[#fafafa] lg:flex">
        <HeroBackdrop />

        <div className="container-wide relative z-10 flex flex-1 flex-col justify-center items-end overflow-hidden pb-12 pt-32 text-right">
          <h1
            className="hero-stagger font-display text-[clamp(1.85rem,4.5vw,4.4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white"
            style={{ animationDelay: "150ms" }}
          >
            <span className="block">We build modern brands</span>
            <span className="block">and digital experiences</span>
          </h1>

          <p
            className="hero-stagger mt-6 font-display text-[clamp(1.3rem,2.8vw,2.8rem)] font-semibold tracking-[-0.015em] text-white/70"
            style={{ animationDelay: "300ms" }}
          >
            Designed to <Typed />
          </p>

          <p
            className="hero-stagger mt-9 ml-auto max-w-xl text-left font-body text-base leading-relaxed text-white/65 md:text-lg"
            style={{ animationDelay: "450ms" }}
          >
            A strategic web design, branding, and SEO studio creating clear, practical work that
            helps Australian businesses grow.
          </p>

          <div
            className="hero-stagger mt-10 flex flex-col items-end gap-4 sm:flex-row sm:justify-end"
            style={{ animationDelay: "600ms" }}
          >
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.025em] text-white shadow-[0_10px_30px_-10px_rgba(232,36,44,0.95)] transition-colors duration-300 hover:bg-brand-dark"
            >
              Start a Project
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                &#8594;
              </span>
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#444] px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-[#fafafa] transition-all duration-300 hover:border-brand hover:text-brand"
            >
              See Our Work
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 hidden justify-center lg:flex">
          <div className="flex flex-col items-center gap-1.5 text-white/40">
            <span className="font-body text-[0.6rem] uppercase tracking-[0.2em]">Scroll</span>
            <svg
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
              aria-hidden="true"
              className="hero-scroll-arrow"
            >
              <path
                d="M5.5 0.5V13.5M5.5 13.5L1 9M5.5 13.5L10 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
