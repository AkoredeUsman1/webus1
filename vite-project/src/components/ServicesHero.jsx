/* ------------------------------------------------------------------ *
 * Services — sticky stacking cards (matches the webgaze-clone design)
 *
 * Each card sticks 28px below the previous one as you scroll, piling
 * into a deck of strips with the current card fully open. Pure CSS
 * position: sticky — no JavaScript needed. Stacking runs at every
 * breakpoint (160 → 300px offsets) so phones pile up the same way
 * the desktop view does.
 * ------------------------------------------------------------------ */

const CARDS = [
  {
    title: "Web Design & Development",
    body:
      "At WebGaze, we design and build websites that work for your business. Every site is carefully designed and built to help your brand stand out, perform well online, and connect with the right audience.",
    tags: ["React.JS", "E-Commerce", "WordPress"],
  },
  {
    title: "AI & Custom Business Systems",
    body:
      "We build custom tools, internal apps, automations, and AI-assisted systems that solve real business problems — from tracking work to managing learning, chats, records, and daily operations.",
    tags: ["AI Tools", "Automation", "Custom Apps"],
  },
  {
    title: "Visual Branding",
    body:
      "Visual branding is how people recognise your brand. We create cohesive brand visuals — from logos to colour systems — that help your business stand out, stay consistent, and connect with the right audience.",
    tags: ["Graphic Design", "Logo Design", "Brand Guide"],
  },
  {
    title: "Website Maintenance",
    body:
      "Every website needs ongoing maintenance to stay secure, fast, and up to date. Regular care helps prevent issues and ensures a smooth experience for your users.",
    tags: ["Security", "Updates", "Backups"],
  },
  {
    title: "Search Engine Optimisation",
    body:
      "A strong SEO strategy helps your website get found by the right people. We optimise your site to improve visibility, attract relevant traffic, and support a smooth user experience.",
    tags: ["On-Page SEO", "Keyword Research", "Analytics"],
  },
  {
    title: "Consulting & Audit",
    body:
      "Our website consultation and audit services help you understand what's working and what needs improvement. We review your site's performance, security, design, and SEO.",
    tags: ["SEO Audit", "Security Audit", "UI/UX Audit"],
  },
];

/* Each card sticks 28px below the previous one (160 → 300px) — same
   offsets at every breakpoint, matching the reference site, so the deck
   piles up on phones exactly as it does on desktop. */
const TOPS = [
  "top-[160px]",
  "top-[188px]",
  "top-[216px]",
  "top-[244px]",
  "top-[272px]",
  "top-[300px]",
];

export default function ServicesHero() {
  return (
    <section
      id="services"
      className="border-t border-light-border bg-light-bg py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* ------------------------------ Copy ------------------------------ */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <h2 className="font-display text-[30px] font-bold leading-[1.1] text-[#0f0f0f] md:text-[38px] lg:text-[48px]">
              Everything You Need to Build a Strong Online Presence
            </h2>

            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-light-muted">
              From strategy and design to optimisation and ongoing support, our services
              work together to help your business grow online — with clarity and
              confidence at every step.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-red-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.025em] text-white transition-colors duration-200 hover:bg-[#c4161e]"
              >
                Contact Us
              </a>

              <a
                href="#"
                className="inline-flex items-center rounded-full border border-black px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.025em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
              >
                Request a Proposal
              </a>
            </div>
          </div>

          {/* --------------------------- Card stack --------------------------- */}
          <div className="relative">
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                className={`sticky mb-4 ${TOPS[i]}`}
                style={{ zIndex: i + 1 }}
              >
                <div className="group rounded-2xl border border-light-border bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                  <h3 className="mb-4 font-display text-xl font-bold leading-snug text-[#0f0f0f]">
                    {card.title}
                  </h3>

                  <p className="mb-6 font-body text-[15px] leading-relaxed text-light-muted">
                    {card.body}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-light-border px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[#555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-light-border pt-5">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-full border border-[#0f0f0f] px-4 py-2 font-display text-sm font-semibold text-[#0f0f0f] transition-all duration-200 hover:bg-[#0f0f0f] hover:text-white"
                    >
                      Learn more →
                    </a>

                    <a
                      href="#"
                      className="font-display text-sm font-bold text-[#0f0f0f] transition-colors duration-200 hover:text-red-brand"
                    >
                      View Our Work →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
