import { useEffect, useRef, useState } from "react";
import { PROJECTS, SUBTITLE } from "../data/projects";

/* ------------------------------------------------------------------ *
 * Projects — selected work showcase
 *
 * Mobile (<1024px): horizontal snap carousel with counter, progress
 * bar and prev/next arrows.
 * Desktop (≥1024px): 200vh pinned section — sticky full-screen stage
 * with two infinite marquee rows of project cards that tilt in
 * (rotateX/rotateZ/opacity) as you scroll into the section.
 * ------------------------------------------------------------------ */

function MobileCarousel() {
  const trackRef = useRef(null);
  const revealRef = useRef(null); // untransformed box — safe to measure
  const stageRef = useRef(null); // the 3D-tilted wrapper
  const [index, setIndex] = useState(0);

  /* Auto-glide: the laptop showcase runs its card rows as an infinite
     marquee, so the phone variant keeps the cards moving the same way —
     advancing through the deck on a loop and yielding whenever the user
     takes over (swipe, wheel or arrow tap). */
  const [paused, setPaused] = useState(false);
  const resumeRef = useRef(null);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const pauseFor = (ms = 7000) => {
    setPaused(true);
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setPaused(false), ms);
  };

  useEffect(
    () => () => {
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
    },
    []
  );

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.children[0];
    if (!item) return;
    const w = item.offsetWidth + 12; // card + gap-3
    setIndex(Math.min(PROJECTS.length - 1, Math.max(0, Math.round(el.scrollLeft / w))));
  };

  const go = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.children[0];
    if (!item) return;

    pauseFor(); // an arrow tap counts as user input — hold the glide

    const step = item.offsetWidth + 12;

    /* Wrap-around navigation (matches the reference site): past the last
       card it eases back to the first, and vice-versa, instead of hitting
       a hard wall with a disabled button. */
    if (dir > 0 && index >= PROJECTS.length - 1) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir < 0 && index <= 0) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      return;
    }

    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* Auto-advance through the deck — the phone counterpart of the laptop
     marquee. Wraps 12 → 1 and backs off for `pauseFor` after any input. */
  useEffect(() => {
    if (paused || reducedMotion) return undefined;

    const next = index >= PROJECTS.length - 1 ? 0 : index + 1;
    const id = window.setTimeout(() => {
      const el = trackRef.current;
      const item = el && el.children[0];
      if (!el || !item) return;
      el.scrollTo({ left: next * (item.offsetWidth + 12), behavior: "smooth" });
    }, 3200);

    return () => window.clearTimeout(id);
  }, [index, paused, reducedMotion]);

  /* ---------------- Tilt-in reveal (matches DesktopShowcase) ----------------
     The stage starts pushed back in3D — translateY(-100px) rotateX(15deg)
     rotateZ(10deg) at 0.2 opacity — and straightens as the section rises
     into the viewport, using the same value ranges as the pinned desktop
     version so both breakpoints load the same way.

     The rect is read from revealRef (never transformed) rather than the
     stage itself: getBoundingClientRect() on the stage would include its
     own transform and feed back into p, which can oscillate. */
  useEffect(() => {
    const reveal = revealRef.current;
    const stage = stageRef.current;
    if (!reveal || !stage) return undefined;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      stage.style.opacity = "1";
      stage.style.transform = "none";
      return undefined;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = reveal.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 while the section is still below the fold, 1 once it is half up the screen
      const t = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.5)));
      stage.style.opacity = String(0.2 + 0.8 * t);
      stage.style.transform = `translateY(${-100 + 100 * t}px) rotateX(${
        15 - 15 * t
      }deg) rotateZ(${10 - 10 * t}deg)`;
    };
    const onViewportScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onViewportScroll, { passive: true });
    window.addEventListener("resize", onViewportScroll);
    return () => {
      window.removeEventListener("scroll", onViewportScroll);
      window.removeEventListener("resize", onViewportScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const pct = ((index + 1) / PROJECTS.length) * 100;

  return (
    <>
      <div ref={revealRef} className="relative mt-8 [perspective:1000px] [transform-style:preserve-3d]">
        <div
          ref={stageRef}
          className="will-change-transform"
          style={{ opacity: 0.2, transform: "translateY(-100px) rotateX(15deg) rotateZ(10deg)" }}
        >
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={() => pauseFor()}
            onWheel={(e) => {
              if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) pauseFor();
            }}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scroll-pl-6 pl-6 pr-[16vw] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
          {PROJECTS.map((p, i) => (
            <div key={p.slug} className="w-[80vw] shrink-0 snap-start py-5">
              <a
                href={`/projects/${p.slug}`}
                aria-label={`View ${p.title}`}
                className="group relative block origin-center rounded-[1.75rem] bg-[#0f0f0f] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-[transform,opacity] duration-500 ease-out will-change-transform"
                style={{
                  transform: `scale(${i === index ? 1 : 0.92})`,
                  opacity: i === index ? 1 : 0.5,
                }}
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-t-[1.75rem]">
                  <img
                    alt={p.title}
                    loading="lazy"
                    src={p.img}
                    className="absolute h-full w-full object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent"
                  />
                  <span className="absolute left-4 top-4 font-display text-5xl font-bold leading-none text-white/15">
                    {p.n}
                  </span>
                </div>
                <div className="px-5 pb-6 pt-1">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-red-brand">
                    {p.cat}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">
                    {p.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-white">
                    View project
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Counter + progress + arrows */}
      <div className="container-wide mt-6 flex items-center gap-4">
        <span className="font-display text-sm font-bold tabular-nums text-white">
          {String(index + 1).padStart(2, "0")}
          <span className="text-neutral-500">/ {PROJECTS.length}</span>
        </span>
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-red-brand transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => go(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition active:scale-95 disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => go(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition active:scale-95 disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      <div className="container-wide mt-8">
        <a
          href="#"
          className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-red-brand hover:text-red-brand"
        >
          See All Projects
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      </div>
    </>
  );
}

function DesktopShowcase() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  /* Scroll progress → tilt-in transform (same start state as the clone) */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      // Tilt straightens over the first ~30% of the pinned range
      const t = Math.min(1, p / 0.3);
      const opacity = 0.2 + 0.8 * t;
      const ty = -100 + 100 * t;
      const rx = 15 - 15 * t;
      const rz = 10 - 10 * t;
      stage.style.opacity = String(opacity);
      stage.style.transform = `translateY(${ty}px) rotateX(${rx}deg) rotateZ(${rz}deg)`;
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

  const row = (items, duration, delay) => (
    <div
      className="marquee-row flex"
      style={{ "--marquee-duration": `${duration}s`, animationDelay: `${delay}s` }}
    >
      {[...items, ...items].map((p, i) => (
        <div key={`${p.slug}-${i}`} className="shrink-0 pr-3 md:pr-4 lg:pr-5">
          <div className="group/product relative w-[20.4rem] flex-shrink-0 aspect-[16/9] sm:w-[22.8rem] md:w-[26.4rem] lg:w-[30rem]">
            <a
              aria-label={`View ${p.title}`}
              href={`/projects/${p.slug}`}
              className="block h-full w-full overflow-hidden rounded-2xl bg-[#111] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/5 transition-all duration-500 group-hover/product:ring-red-brand/40 group-hover/product:shadow-[0_25px_60px_-20px_rgba(224,27,36,0.35)]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  alt={p.title}
                  loading="lazy"
                  src={p.img}
                  className="absolute inset-0 h-full w-full scale-100 object-cover object-center opacity-100 blur-0 transition-all duration-[1200ms] ease-out group-hover/product:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <h3 className="font-display text-xs font-semibold leading-snug text-white opacity-90 transition-opacity duration-300 group-hover/product:opacity-100 md:text-sm">
                    {p.title}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative hidden h-[200vh] bg-dark-bg antialiased md:h-[220vh] lg:block"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-10 pt-16 [perspective:1000px] [transform-style:preserve-3d] md:pt-20">
        {/* Red ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 10%, rgba(224, 27, 36, 0.1), transparent 70%), radial-gradient(50% 35% at 80% 90%, rgba(224, 27, 36, 0.07), transparent 70%)",
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,4vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
                Projects that
                <br />
                speak for themselves.
              </h2>
              <p className="mt-4 max-w-xl text-sm text-neutral-300 md:text-base">
                {SUBTITLE}
              </p>
            </div>

            <a
              href="#"
              className="group inline-flex items-center gap-3 self-start rounded-full border border-white/15 px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-red-brand hover:text-red-brand md:self-auto"
            >
              See All Projects
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-1 items-center md:mt-10">
          <div
            ref={stageRef}
            className="will-change-transform w-full"
            style={{ opacity: 0.2, transform: "translateY(-100px) rotateX(15deg) rotateZ(10deg)" }}
          >
            <div className="mb-3 md:mb-4 lg:mb-5">{row(PROJECTS, 70, 0)}</div>
            <div>{row([...PROJECTS.slice(6), ...PROJECTS.slice(0, 6)], 90, -45)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <div id="projects">
      {/* ------------------------- Mobile variant ------------------------- */}
      <section className="relative overflow-hidden bg-dark-bg py-16 lg:hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(70% 40% at 50% 0%, rgba(224, 27, 36, 0.12), transparent 70%)",
          }}
        />
        <div className="container-wide relative">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-red-brand">
            Selected work
          </p>
          <h2 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            Projects that
            <br />
            speak for themselves.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-neutral-300">{SUBTITLE}</p>
        </div>

        <MobileCarousel />
      </section>

      {/* ------------------------ Desktop variant ------------------------- */}
      <DesktopShowcase />
    </div>
  );
}
