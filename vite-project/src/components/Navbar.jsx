import { useEffect, useLayoutEffect, useRef, useState } from "react";

const LINKS = [
  { label: "Home", active: true },
  { label: "About" },
  { label: "Services", caret: true, dropdown: true },
  { label: "Projects" },
  { label: "Insights" },
  { label: "Contact" },
];

const SERVICES = [
  {
    label: "Website Design & Development",
    short: "Custom, high-performance websites built to convert.",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "AI & Custom Business Systems",
    short: "Custom apps, automations, and AI-assisted tools.",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
  },
  {
    label: "Visual Branding",
    short: "Cohesive brand identities that make you unmistakable.",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="19" cy="13" r="2" />
        <circle cx="6" cy="13" r="2" />
        <circle cx="10" cy="19" r="2" />
        <path d="M13.5 9C12 13 8 14 8 14M13.5 9C15 12 17.5 12 17.5 12M8 15c1 2 2 2.5 2 2.5M17.5 12c0 2-1.5 3.5-1.5 3.5" />
      </svg>
    ),
  },
  {
    label: "Website Maintenance",
    short: "Keep your site secure, fast, and up to date.",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Search Engine Optimisation",
    short: "Get found by the right people at the right time.",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    label: "Consulting & Audit",
    short: "Understand what's working and what needs to improve.",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2h11" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/webgaze",
    size: 16,
    children: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/webgaze.au",
    size: 16,
    stroked: true,
    children: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/webgaze_au",
    size: 14,
    children: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
];

/* ------------------------------------------------------------------ *
 * Logo — the brand PNG (red mark + white wordmark) on dark surfaces,
 * and a masked recolour of the same PNG (red mark + near-black
 * wordmark) so it stays readable on the light floating pill.
 * ------------------------------------------------------------------ */
const LOGO_SRC = "/images/logo-white.png";

function Logo({ light }) {
  if (light) {
    return (
      <a
        href="#"
        className="relative z-10 flex h-10 shrink-0 items-center select-none"
        aria-label="Webgaze home"
      >
        <span
          aria-hidden="true"
          className="block h-8 w-32 sm:h-9 sm:w-36"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e01b24 0 28.5%, #101010 28.5% 100%)",
            WebkitMaskImage: `url(${LOGO_SRC})`,
            maskImage: `url(${LOGO_SRC})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </a>
    );
  }

  return (
    <a
      href="#"
      className="relative z-10 flex h-10 shrink-0 items-center select-none"
      aria-label="Webgaze home"
    >
      <img src={LOGO_SRC} alt="" className="h-8 w-auto sm:h-9" />
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Detect whether the navbar currently sits over a light or dark
 * section. Finds which <section>/<footer> spans the navbar's vertical
 * centre and reads its background colour.
 * ------------------------------------------------------------------ */
function detectTheme() {
  const probeY = 48; // vertical centre of the navbar band

  // Collect every section-level block and find the one under the probe line
  const blocks = document.querySelectorAll("section, footer");
  let target = null;
  for (const block of blocks) {
    const rect = block.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom >= probeY && rect.height > 0) {
      target = block;
      break;
    }
  }
  if (!target) return "dark";

  // Read the background colour, walking up if it is transparent
  let node = target;
  let bg = null;
  while (node && node !== document.body) {
    if (node instanceof HTMLElement) {
      const style = window.getComputedStyle(node);
      const color = style.backgroundColor;
      if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
        bg = color;
        break;
      }
    }
    node = node.parentElement;
  }
  if (!bg) return "dark";

  // Parse "rgb(r, g, b)" / "rgba(r, g, b, a)" / "oklab(...)"
  let r;
  let g;
  let b;
  const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    r = Number(match[1]);
    g = Number(match[2]);
    b = Number(match[3]);
  } else {
    // Fallback: render the colour into a probe element to get rgb()
    const probe = document.createElement("div");
    probe.style.color = bg;
    document.body.appendChild(probe);
    const rgb = window.getComputedStyle(probe).color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    document.body.removeChild(probe);
    if (!rgb) return "dark";
    r = Number(rgb[1]);
    g = Number(rgb[2]);
    b = Number(rgb[3]);
  }

  // Relative luminance approximation (sRGB)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "light" : "dark";
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [pane, setPane] = useState("main");
  const [theme, setTheme] = useState("dark");
  const [hovered, setHovered] = useState(null);
  const itemRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Keep the page from scrolling behind the drawer while it is open
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Track scroll + adaptive theme
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setTheme(detectTheme());
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Red pill behind the nav label — follows the hovered item and
     rests on the active one, measured straight from the DOM. */
  const targetIndex = hovered ?? LINKS.findIndex((l) => l.active);

  useLayoutEffect(() => {
    let cancelled = false;

    const update = () => {
      if (cancelled) return;
      const el = itemRefs.current[targetIndex];
      if (!el) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };

    update();
    window.addEventListener("resize", update);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(update).catch(() => {});
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", update);
    };
  }, [targetIndex]);

  const close = () => {
    setOpen(false);
    setPane("main");
  };

  const isLight = theme === "light";

  return (
    <header className="fixed inset-x-0 top-5 z-[100] overflow-visible">
      <div className="container-wide relative z-[95] flex items-center justify-between">
        {/* Floating pill that sits behind the logo and burger on phones */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-5 -inset-x-3 -bottom-2 rounded-b-2xl border border-t-0 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out lg:hidden ${
            isLight
              ? "border-[#dcdcd6]/60 bg-white/80 shadow-[0_16px_44px_rgba(0,0,0,0.08)]"
              : "border-white/15 bg-[#101010]/55 shadow-[0_16px_44px_rgba(0,0,0,0.18)]"
          }`}
        />

        <Logo light={isLight} />

        {/* Centre navigation pill, pinned to the exact middle of the page */}
        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border px-5 py-3 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 lg:flex ${
            isLight
              ? "border-[#dcdcd6]/60 bg-white/80 text-[#0a0a0a] shadow-[0_16px_44px_rgba(0,0,0,0.08)]"
              : "border-white/15 bg-[#101010]/55 text-white shadow-[0_16px_44px_rgba(0,0,0,0.18)]"
          }`}
        >
          <div
            className="relative flex items-center gap-1"
            onMouseLeave={() => setHovered(null)}
          >
            {/* Sliding red pill behind the active / hovered label */}
            <span
              aria-hidden="true"
              className="absolute top-0 h-8 rounded-full bg-brand shadow-[0_10px_24px_rgba(224,27,36,0.22)] transition-all duration-300 ease-out"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.width ? 1 : 0,
              }}
            />

            {LINKS.map(({ label, active, caret }, i) => (
              <a
                key={label}
                href="#"
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="relative flex h-8 items-center overflow-hidden rounded-full px-3 font-display text-sm font-semibold transition-colors duration-200 focus-visible:outline-none"
              >
                <span
                  className="relative z-10 inline-flex items-center gap-[5px] transition-colors duration-200"
                  style={{
                    color:
                      active || hovered === i
                        ? "#ffffff"
                        : isLight
                          ? "rgba(10, 10, 10, 0.7)"
                          : "rgba(255, 255, 255, 0.72)",
                  }}
                >
                  {label}
                  {caret && (
                    <svg
                      width="9"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      className="mt-[1px]"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </a>
            ))}
          </div>
        </nav>

        <a
          href="#"
          className="hidden h-9 shrink-0 items-center rounded-full bg-brand px-4 font-display text-sm font-semibold text-white shadow-[0_10px_24px_rgba(224,27,36,0.22)] transition-colors duration-200 hover:bg-red-dark lg:flex"
        >
          Request a Proposal
        </a>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`relative z-[100] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-300 lg:hidden ${
            isLight ? "text-[#0f0f0f]" : "text-white"
          }`}
        >
          <span
            className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ---------------------------------------------------------------- *
       * Mobile drawer — always mounted so it can slide in and out
       * ---------------------------------------------------------------- */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Dimmed scrim */}
        <div
          onClick={close}
          className={`absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-[420px] flex-col overflow-hidden bg-[#0a0a0a] text-white shadow-[-20px_0_60px_rgba(0,0,0,0.4)] transition-[transform,visibility] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "visible translate-x-0" : "invisible translate-x-full"
          }`}
        >
          {/* Red bloom in the top-right corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 h-[360px] w-[360px] rounded-full bg-[rgba(224,27,36,0.2)] blur-[110px]"
          />

          <div className="relative flex-1 overflow-hidden">
            {/* ---- Main list ---- */}
            <div
              className={`absolute inset-0 flex flex-col overflow-y-auto px-6 pb-8 pt-20 transition-[transform,opacity] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                pane === "main" ? "translate-x-0 opacity-100" : "-translate-x-[30%] opacity-40"
              }`}
              aria-hidden={pane !== "main"}
            >
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand">
                Menu
              </p>

              <nav className="flex flex-col">
                {LINKS.map(({ label, active, dropdown }, i) => {
                  const number = String(i + 1).padStart(2, "0");

                  if (dropdown) {
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setPane("services")}
                        className="group flex items-center justify-between gap-4 border-b border-white/10 py-3 text-left"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-[10px] font-semibold tabular-nums tracking-widest text-white/35">
                            {number}
                          </span>
                          <span className="text-[1.375rem] font-semibold leading-none tracking-tight text-white transition-colors duration-200 group-hover:text-brand">
                            {label}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-xl leading-none text-white/45 transition-colors duration-200 group-hover:text-brand"
                        >
                          ›
                        </span>
                      </button>
                    );
                  }

                  return (
                    <a
                      key={label}
                      href="#"
                      onClick={close}
                      className="group flex items-baseline gap-3 border-b border-white/10 py-3"
                    >
                      <span
                        className={`text-[10px] font-semibold tabular-nums tracking-widest ${
                          active ? "text-brand" : "text-white/35"
                        }`}
                      >
                        {number}
                      </span>
                      <span
                        className={`text-[1.375rem] font-semibold leading-none tracking-tight transition-colors duration-200 group-hover:text-brand ${
                          active ? "text-brand" : "text-white"
                        }`}
                      >
                        {label}
                      </span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-6">
                <a
                  href="#"
                  onClick={close}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(224,27,36,0.3)] transition-colors duration-200 hover:bg-brand-dark"
                >
                  Request a Proposal
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-auto flex flex-col gap-4 pt-8">
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:hello@webgaze.com.au"
                    className="text-[13px] font-medium text-white/70 transition-colors hover:text-brand"
                  >
                    hello@webgaze.com.au
                  </a>
                  <a
                    href="tel:0422169233"
                    className="text-[13px] font-medium text-white/70 transition-colors hover:text-brand"
                  >
                    0422 169 233
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ label, href, size, stroked, children }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors duration-200 hover:border-brand hover:text-brand"
                    >
                      <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill={stroked ? "none" : "currentColor"}
                        stroke={stroked ? "currentColor" : undefined}
                        strokeWidth={stroked ? "2" : undefined}
                      >
                        {children}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Services sub-pane ---- */}
            <div
              className={`absolute inset-0 flex flex-col overflow-y-auto bg-[#0a0a0a] px-6 pb-8 pt-20 transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                pane === "services" ? "translate-x-0" : "translate-x-full"
              }`}
              aria-hidden={pane !== "services"}
            >
              <button
                type="button"
                onClick={() => setPane("main")}
                className="mb-5 flex items-center gap-2 self-start text-xs font-semibold text-white/65 transition-colors hover:text-brand"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ‹
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em]">Back</span>
              </button>

              <p className="mb-5 text-[1.375rem] font-semibold leading-none tracking-tight text-white">
                Services
              </p>

              <div className="flex flex-col">
                {SERVICES.map(({ label, short, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={close}
                    className="group flex items-center gap-3 border-b border-white/10 py-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/65 transition-colors duration-200 group-hover:bg-[rgba(224,27,36,0.15)] group-hover:text-brand">
                      {icon}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-brand">
                        {label}
                      </span>
                      <span className="text-[11px] leading-snug text-white/55">{short}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
