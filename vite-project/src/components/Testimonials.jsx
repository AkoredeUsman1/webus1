import { useEffect, useState } from "react";
import FaqAccordion from "./Faq";

/* ------------------------------------------------------------------ *
 * Testimonials + FAQ
 *
 * Mobile (<1024px): two stacked sections — dark auto-rotating quote
 * card, then a light FAQ accordion.
 * Desktop (≥1024px): one split section — light testimonial card with
 * progress-bar nav on the left, FAQ accordion + Email Us on the right.
 * ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    initials: "CP",
    quote:
      "WebGaze completely transformed how we show up online. The website is clean, fast, and we're already getting more enquiries. They really understood what we needed.",
    name: "Care Partners Australia",
    role: "NDIS Service Provider",
  },
  {
    initials: "AG",
    quote:
      "From logo to website, everything came together exactly as we envisioned. They communicated well throughout and delivered a result we're genuinely proud of.",
    name: "Australian Ghanaian Chamber of Commerce",
    role: "Commerce & Trade Organisation",
  },
  {
    initials: "WM",
    quote:
      "The level of craft and attention to detail was impressive. Our brand now feels cohesive and professional across every touchpoint.",
    name: "WINSTAMAC",
    role: "Brand & Design",
  },
];

const ROTATE_MS = 5000;

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % TESTIMONIALS.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, reducedMotion]);

  const t = TESTIMONIALS[active];

  return (
    <>
      {/* ---------------------- Mobile testimonials ---------------------- */}
      <section className="relative overflow-hidden bg-[#fafafa] pb-16 pt-24 lg:hidden">
        <div className="px-6">
          <span className="label-tag">Testimonials</span>
          <h2 className="text-display-mob mt-4 text-[#0a0a0a]">What clients think.</h2>
        </div>

        <div
          className="relative mx-6 mt-10 min-h-[260px] overflow-hidden rounded-[26px] border border-black/10 bg-gradient-to-b from-[#0f0f12] to-[#050507] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          aria-live="polite"
        >
          <span className="font-display text-5xl leading-none text-red-brand">“</span>
          <p className="mt-3 font-display text-[1.05rem] leading-[1.45] tracking-[-0.012em] text-white/85">
            {t.quote}
          </p>
          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="font-display text-sm font-semibold text-white">{t.name}</p>
            <p className="font-body text-[12px] text-white/45">{t.role}</p>
          </div>

          <div className="absolute bottom-4 right-5 flex gap-1.5">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all ${
                  i === active ? "w-6 bg-white" : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ Mobile FAQ ----------------------------- */}
      <section className="relative bg-[#f4f4f6] pb-20 pt-24 lg:hidden">
        <div className="px-6">
          <span className="label-tag">FAQ</span>
          <h2 className="text-display-mob mt-4 text-[#0a0a0a]">Questions, answered.</h2>
          <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-[#0a0a0a]/65">
            Can&apos;t find the answer you&apos;re looking for? Reach out directly —
            we&apos;re happy to help.
          </p>
        </div>

        <FaqAccordion className="mt-9 px-6" />
      </section>

      {/* --------------------- Desktop split section --------------------- */}
      <section className="hidden border-t border-light-border bg-light-bg section-pad lg:block">
        <div className="container-wide">
          <div className="grid grid-cols-1 items-stretch gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Left — testimonials */}
            <div className="flex h-full flex-col">
              <span className="label-tag">Testimonials</span>
              <h2 className="text-display-lg mt-5 font-bold text-[#0f0f0f]">
                What clients think.
              </h2>
              <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-light-muted">
                Real outcomes for real businesses — built with strategy, clarity, and craft.
              </p>

              <div className="relative mt-9 flex-1 overflow-hidden" aria-live="polite">
                <div
                  className="flex h-full min-h-[380px] w-full flex-col justify-between rounded-2xl bg-[#f2f2f2] p-8 text-[#0f0f0f] shadow-[8px_12px_48px_rgba(0,0,0,0.14),inset_2px_2px_0_rgba(255,255,255,0.8)] md:p-10"
                >
                  <div className="mb-5 flex justify-center md:mb-10">
                    <div className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-3.5 md:h-16 md:rounded-xl md:px-5">
                      <span className="font-display text-lg font-bold tracking-tight text-[#0f0f0f] md:text-2xl">
                        {t.initials}
                      </span>
                    </div>
                  </div>

                  <blockquote className="flex-1 font-body text-[0.95rem] italic leading-[1.55] text-[#1a1a1a] md:text-2xl md:leading-[1.6]">
                    “{t.quote}”
                  </blockquote>

                  <div className="mt-5 border-t border-[#0f0f0f]/10 pt-4 md:mt-10 md:pt-7">
                    <p className="font-display text-sm font-bold text-[#0f0f0f] md:text-base">
                      {t.name}
                    </p>
                    <p className="mt-0.5 font-body text-xs text-[#777] md:mt-1 md:text-sm">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#ddd]"
                  >
                    <span
                      className="absolute inset-0 rounded-full bg-[#0f0f0f] transition-opacity duration-300"
                      style={{ opacity: i === active ? 1 : 0 }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right — FAQ */}
            <div className="flex h-full flex-col">
              <span className="label-tag">FAQ</span>
              <h2 className="text-display-lg mt-5 font-bold text-[#0f0f0f]">
                Questions, answered.
              </h2>
              <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-light-muted">
                Can&apos;t find the answer you&apos;re looking for? Reach out directly —
                we&apos;re happy to help.
              </p>

              <FaqAccordion
                className="mt-9 flex-1 border-t border-light-border"
                border="border-light-border"
                variant="desktop"
              />

              <a
                href="mailto:hello@webgaze.com.au"
                className="btn-primary mt-8 self-start"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
