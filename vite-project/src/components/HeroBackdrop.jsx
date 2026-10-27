/**
 * The decorative layer behind the hero.
 *
 * Geometry, colours and opacities are a 1:1 port of the production backdrop:
 * a 200-unit architectural grid, two semicircle "radar" clusters, a slow
 * rotating orbit, the red quadrant accent and the pale quarter disc.
 *
 * Everything is purely visual — no interactivity, no dependencies.
 */

const TOP_ARCS = [30, 55, 80, 105, 130, 155, 180];
const BOTTOM_ARCS = [30, 55, 80, 105, 130, 155, 180, 205];

export default function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="hero-deco absolute left-0 top-0 hidden h-full w-auto max-w-[55%] select-none lg:block"
      >
        {/* ---- Architectural grid (500 unit rhythm) ---- */}
        <g stroke="#ffffff" strokeWidth="0.5">
          <line x1="200" y1="0" x2="200" y2="800" />
          <line x1="400" y1="0" x2="400" y2="800" />
          <line x1="0" y1="200" x2="800" y2="200" />
          <line x1="0" y1="400" x2="800" y2="400" />
          <line x1="0" y1="600" x2="800" y2="600" />
        </g>

        {/* ---- Upper radar cluster: upper semicircles around (200, 400) ---- */}
        {TOP_ARCS.map((r, i) => (
          <path
            key={`arc-top-${r}`}
            className="hero-arc"
            style={{ "--arc-delay": `${0.2 + 0.04 * i}s` }}
            d={`M ${200 - r} 400 A ${r} ${r} 0 0 1 ${200 + r} 400`}
            pathLength="1"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
        ))}

        {/* ---- Lower radar cluster: lower semicircles around (200, 600) ---- */}
        {BOTTOM_ARCS.map((r, i) => (
          <path
            key={`arc-bottom-${r}`}
            className="hero-arc"
            style={{ "--arc-delay": `${0.4 + 0.04 * i}s` }}
            d={`M ${200 - r} 600 A ${r} ${r} 0 0 0 ${200 + r} 600`}
            pathLength="1"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
        ))}

        {/* ---- Slow orbiting rings ---- */}
        <g className="hero-deco-orbit">
          <circle cx="400" cy="400" r="380" stroke="#ffffff" strokeWidth="0.4" opacity="0.5" />
          <circle
            cx="400"
            cy="400"
            r="280"
            stroke="#ffffff"
            strokeWidth="0.4"
            opacity="0.4"
            strokeDasharray="2 8"
          />
        </g>

        {/* ---- Bullseye circles in the upper-left grid cell ---- */}
        <circle cx="200" cy="200" r="160" stroke="#ffffff" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="120" stroke="#ffffff" strokeWidth="0.4" />

        {/* ---- Red quadrant filling the (200,200) grid cell ---- */}
        <path d="M 200 200 L 400 200 A 200 200 0 0 1 200 400 Z" fill="#E01B24" opacity="0.55" />

        {/* ---- Pale quarter disc anchored to the left edge ---- */}
        <path d="M 0 400 L 200 400 A 200 200 0 0 0 0 600 Z" fill="#ffffff" opacity="0.16" />
      </svg>

      {/* Soft red bloom bleeding out of the bottom-right corner (desktop) */}
      <div className="absolute -bottom-40 -right-40 hidden h-[720px] w-[720px] rounded-full bg-[rgba(224,27,36,0.06)] blur-[160px] lg:block" />

      {/* Mobile bloom anchored to the bottom-left corner */}
      <div className="absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-[rgba(224,27,36,0.06)] blur-[140px] lg:hidden" />
    </div>
  );
}
