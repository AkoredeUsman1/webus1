import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
 * Pre-footer CTA + site footer
 *
 * Mobile (<1024px): full-height gradient CTA hero.
 * Desktop (≥1024px): compact black CTA strip with a red line sweep.
 * Footer is shared by both.
 * ------------------------------------------------------------------ */

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/webgaze",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/webgaze.au",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/GazeWeb",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const SERVICE_LINKS = [
  { label: "Website Design & Development", href: "#" },
  { label: "AI & Custom Business Systems", href: "#" },
  { label: "Website Maintenance", href: "#" },
  { label: "SEO", href: "#" },
  { label: "Visual Branding", href: "#" },
  { label: "Consulting & Audit", href: "#" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Insights", href: "#" },
];

function MobileCta() {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden bg-gradient-to-b from-black via-[#15050a] to-[#3a060c] px-6 pb-16 pt-28 lg:hidden">
      <div>
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-red-brand">
          No pressure. Just next steps.
        </p>
        <h2 className="mt-7 font-display text-[clamp(2.5rem,12vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white">
          Let&apos;s build something that <span className="text-white/45">earns its keep</span>.
        </h2>
        <p className="mt-8 font-display text-[1.05rem] font-medium leading-snug text-white/55">
          Tell us where you are and where you&apos;re headed.{" "}
          <span className="text-white">We&apos;ll handle the strategy, design, and build.</span>
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <a
          href="#"
          className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-red-brand px-7 font-display text-sm font-bold uppercase tracking-[0.14em] text-white transition active:scale-[0.98]"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            Request a Proposal
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </a>
        <a
          href="mailto:hello@webgaze.com.au"
          className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/20 px-7 font-display text-sm font-bold uppercase tracking-[0.14em] text-white transition active:scale-[0.98]"
        >
          Email Us
        </a>
        <p className="pt-4 text-center font-body text-[11px] text-white/40">
          We typically respond within 1 business day.
        </p>
      </div>
    </section>
  );
}

function DesktopStrip() {
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative hidden overflow-hidden bg-[#0a0a0a] py-10 md:py-14 lg:block">
      {/* Red ambient blob */}
      <div className="pointer-events-none absolute right-[8%] top-1/2 h-56 w-[420px] -translate-y-1/2 rounded-full bg-red-brand opacity-[0.07] blur-[120px]" />

      {/* Animated top line */}
      <div ref={lineRef} className="strip-line absolute inset-x-0 top-0 h-[2px] bg-red-brand" />

      <div className="container-wide relative z-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-red-brand">
              No pressure. Just next steps.
            </p>
            <p className="mt-3 max-w-[24ch] font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Let&apos;s build something that{" "}
              <span className="text-white/45">earns its keep</span>.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href="#" className="btn-primary justify-center">
              Request a Proposal <span aria-hidden="true">→</span>
            </a>
            <a
              href="#"
              className="btn-outline justify-center border-white/30 text-white hover:border-red-brand"
            >
              Book Discovery Call <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-dark-border bg-[#0a0a0a] text-[#fafafa]">
      <div className="container-wide py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="mb-4 inline-block">
              <img
                src="https://webgaze-clone.vercel.app/images/logo-white.png"
                alt="WebGaze"
                className="h-7 w-auto"
              />
            </a>
            <p className="max-w-[320px] font-body text-sm leading-relaxed text-dark-muted">
              Building high-performance websites, AI-assisted custom systems, and practical
              digital tools for growing businesses.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-border text-[#888] transition-colors duration-200 hover:border-red-brand hover:text-red-brand"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-dark-muted">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#c0c0c0] transition-colors duration-200 hover:text-red-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-dark-muted">
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#c0c0c0] transition-colors duration-200 hover:text-red-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-dark-muted">
              Get In Touch
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:+61422169233"
                  className="text-sm text-[#c0c0c0] transition-colors duration-200 hover:text-red-brand"
                >
                  0422 169 233
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@webgaze.com.au"
                  className="text-sm text-[#c0c0c0] transition-colors duration-200 hover:text-red-brand"
                >
                  hello@webgaze.com.au
                </a>
              </li>
            </ul>

            <p className="mb-3 mt-7 font-display text-xs font-semibold uppercase tracking-[0.12em] text-dark-muted">
              Newsletter
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                required
                name="email"
                id="footer-newsletter-email"
                placeholder="Your email"
                aria-label="Your email"
                className="min-w-0 flex-1 rounded-full border border-dark-border bg-dark-surface px-4 py-2.5 text-sm text-[#fafafa] transition-colors duration-200 placeholder:text-dark-muted focus:border-red-brand focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="rounded-full bg-red-brand px-5 py-2.5 font-display text-xs font-semibold text-white transition-colors duration-200 hover:bg-red-dark"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider mt-10 flex flex-col items-start justify-between gap-3 pt-6 md:flex-row md:items-center">
          <p className="font-body text-xs text-dark-muted">
            © 2026 WebGaze PTY LTD. All rights reserved. ABN 53 694 048 158
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="font-body text-xs text-dark-muted transition-colors duration-200 hover:text-red-brand"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="font-body text-xs text-dark-muted transition-colors duration-200 hover:text-red-brand"
            >
              Privacy &amp; Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function CtaFooter() {
  return (
    <>
      <MobileCta />
      <DesktopStrip />
      <Footer />
    </>
  );
}
