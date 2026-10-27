import { PROJECTS, SUBTITLE } from "../data/projects";

/* ------------------------------------------------------------------ *
 * Project detail page — rendered by App when the URL matches
 * /projects/:slug, so clicking a project card actually takes you
 * somewhere instead of doing nothing.
 * ------------------------------------------------------------------ */

const RED_GLOW = {
  background:
    "radial-gradient(60% 45% at 50% 0%, rgba(224,27,36,0.14), transparent 70%)",
};

function NotFound({ slug }) {
  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center px-6 pb-24 pt-36 text-center">
      <span className="label-tag">404</span>
      <h1 className="mt-4 font-display text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight tracking-[-0.03em] text-white">
        Project not found.
      </h1>
      <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-white/55">
        We couldn&apos;t find a project called &ldquo;{slug}&rdquo;. It may have been renamed
        or moved.
      </p>
      <a href="/" className="btn-primary mt-8">
        Back to home
      </a>
    </section>
  );
}

export default function ProjectDetail({ slug }) {
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return <NotFound slug={slug} />;

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={RED_GLOW} />

      <div className="container-wide relative z-10">
        <a
          href="/"
          className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors duration-200 hover:text-white"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
            &#8592;
          </span>
          All projects
        </a>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <span className="label-tag">{project.cat}</span>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {project.title}
            </h1>
          </div>
          <span className="font-display text-5xl font-bold leading-none text-white/10 md:text-7xl">
            {project.n}
          </span>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-[#0f0f0f] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
          <div className="relative aspect-[16/9] w-full">
            <img
              alt={project.title}
              src={project.img}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent"
            />
          </div>
        </div>

        <p className="mt-8 max-w-2xl font-body text-[15px] leading-relaxed text-white/55">
          {SUBTITLE}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#contact" className="btn-primary">
            Start a project
          </a>
          <a
            href="/#services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.025em] text-white transition-colors duration-200 hover:border-brand hover:text-brand"
          >
            Our services
          </a>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-4">
            <span className="label-tag">More work</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <a
                key={o.slug}
                href={`/projects/${o.slug}`}
                className="group block overflow-hidden rounded-2xl bg-[#0f0f0f] ring-1 ring-white/10 transition-all duration-300 hover:ring-brand/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    alt={o.title}
                    loading="lazy"
                    src={o.img}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0f0f] to-transparent"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 px-4 py-4">
                  <div className="min-w-0">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-red-brand">
                      {o.cat}
                    </p>
                    <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-white">
                      {o.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-white/45 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
