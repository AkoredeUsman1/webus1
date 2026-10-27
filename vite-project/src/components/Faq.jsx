import { useState } from "react";

/* ------------------------------------------------------------------ *
 * FAQ accordion — used by the mobile FAQ section and the desktop
 * testimonials/FAQ split. Single-open, animated with the CSS grid
 * rows trick (smooth height animation without measuring).
 * ------------------------------------------------------------------ */

const FAQ_ITEMS = [
  {
    q: "What does WebGaze actually do?",
    a: "WebGaze helps businesses grow online through strategic website design, branding, SEO, and ongoing digital support. We don't just build websites — we create digital experiences designed to attract the right audience and convert them into customers.",
  },
  {
    q: "How much does a website cost?",
    a: "Every project is different. Pricing depends on your goals, features, and level of support required. After a quick conversation, we'll recommend a clear, practical solution and provide a custom proposal with no obligation.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most websites are completed within 2–6 weeks, depending on scope and content readiness. We'll give you realistic timelines upfront and keep you informed at every stage of the process.",
  },
  {
    q: "Can you redesign or improve an existing website?",
    a: "Absolutely. If your current website feels outdated, slow, or isn't converting, we can audit it, identify opportunities, and redesign or optimise it to perform better — without starting from scratch if it's not necessary.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We offer website maintenance plans starting from $129/month, covering security updates, backups, performance monitoring, and ongoing peace of mind so your site stays healthy long after launch.",
  },
];

export default function FaqAccordion({
  items = FAQ_ITEMS,
  className = "",
  border = "border-black/10",
  variant = "mobile",
}) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <ul className={className}>
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        /* Mobile: top line on every item + bottom edge on the last one.
           Desktop: the <ul> draws the top edge; items only draw the
           lines between them (matching the clone's divide-y). */
        const liBorder = [
          variant === "mobile" || i > 0 ? `border-t ${border}` : "",
          variant === "mobile" ? `last:border-b ${border}` : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={item.q} className={liBorder}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              className="flex w-full items-start justify-between gap-4 py-4 text-left"
            >
              <span className="font-display text-[15px] font-semibold leading-snug text-[#0a0a0a]">
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-black/20 text-[#0a0a0a] transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-9 font-body text-[13.5px] leading-relaxed text-[#0a0a0a]/65">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
