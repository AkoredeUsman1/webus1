/* ------------------------------------------------------------------ *
 * Process — how we work
 *
 * Mobile (<1024px): vertical timeline with a red progress rail.
 * Desktop (≥1024px): dark section, 4 columns under a horizontal rail.
 * Both variants are pure CSS visibility switches — same content.
 * ------------------------------------------------------------------ */

const STEPS = [
  {
    n: "01",
    title: "Discovery & Understanding",
    lead: "We listen before we act.",
    body: "We get clear on your goals, your audience, and the context around the work — defining what success looks like before a single pixel moves.",
    tags: ["Kickoff Call", "Goals", "Research"],
  },
  {
    n: "02",
    title: "Direction & Planning",
    lead: "We map the path forward.",
    body: "With the picture in place, we set scope, priorities, and the practical steps to move — keeping everything aligned, realistic, and built for results.",
    tags: ["Scope", "Sitemap", "Timeline"],
  },
  {
    n: "03",
    title: "Development & Refinement",
    lead: "We build and iterate.",
    body: "Design, content, and systems are shaped through an iterative loop — focused on quality, consistency, and purpose at every stage.",
    tags: ["Design", "Build", "Feedback"],
  },
  {
    n: "04",
    title: "Delivery & Implementation",
    lead: "We launch with confidence.",
    body: "We bring it together, run final checks, and hand over a site that's complete and ready to perform — with support so nothing slips.",
    tags: ["QA", "Launch", "Handover"],
  },
];

const SUBTITLE =
  "From the first conversation to final delivery, every step is intentional — no guesswork, no surprises.";

export default function Process() {
  return (
    <>
      {/* ------------------------- Mobile variant ------------------------- */}
      <section className="relative bg-[#f4f4f6] pb-20 pt-24 lg:hidden">
        <div className="px-6">
          <span className="label-tag">How we work</span>
          <h2 className="text-display-mob mt-4 text-[#0a0a0a]">
            A process built for clarity, not chaos.
          </h2>
          <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
            {SUBTITLE}
          </p>
        </div>

        <div className="relative mt-12 px-6">
          {/* Timeline rails */}
          <div className="absolute bottom-3 left-[34px] top-3 w-px bg-black/10" />
          <div className="absolute left-[34px] top-3 w-px bg-red-brand" />

          <ul className="space-y-10">
            {STEPS.map((s) => (
              <li key={s.n} className="relative flex gap-5 pl-2">
                <span className="relative z-10 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-red-brand font-display text-[11px] font-bold text-white">
                  {s.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.05rem] font-bold leading-tight tracking-[-0.02em] text-[#0a0a0a]">
                    {s.title}
                  </h3>
                  <p className="mt-1 font-display text-[13px] font-medium text-red-brand">
                    {s.lead}
                  </p>
                  <p className="mt-3 font-body text-[13px] leading-[1.55] text-[#0a0a0a]/65">
                    {s.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------ Desktop variant ------------------------- */}
      <section className="relative hidden overflow-hidden bg-dark-surface section-pad lg:block">
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(55% 45% at 15% 0%, rgba(224, 27, 36, 0.08), transparent 70%), radial-gradient(45% 40% at 90% 100%, rgba(224, 27, 36, 0.06), transparent 70%)",
          }}
        />

        <div className="container-wide relative z-10">
          <div className="mb-16 grid grid-cols-1 gap-8 md:mb-20 lg:grid-cols-2 lg:gap-10">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="label-tag">How we work</span>
              </div>
              <h2 className="text-display-md font-display font-bold leading-[1.1] text-white">
                A process built for clarity, not chaos.
              </h2>
            </div>
            <p className="max-w-md self-end font-body text-base leading-relaxed text-white/55 lg:pt-2">
              {SUBTITLE}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-[1.375rem] hidden h-px bg-white/10 lg:block" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="relative">
                  <div className="relative z-10 mb-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-dark-bg font-display text-sm font-bold tracking-[0.1em] text-red-brand">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold leading-snug text-white md:text-xl">
                    {s.title}
                  </h3>
                  <p className="mb-4 font-display text-sm font-medium text-red-brand/90">
                    {s.lead}
                  </p>
                  <p className="mb-6 font-body text-sm leading-relaxed text-white/55">
                    {s.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
