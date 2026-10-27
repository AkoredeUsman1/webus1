/* ------------------------------------------------------------------ *
 * Client logos, hand-built as inline SVG approximations of the marks
 * shown in the design. Swap these for real <img> assets when available.
 * ------------------------------------------------------------------ */

function VRide() {
  return (
    <svg width="132" height="34" viewBox="0 0 132 34" fill="none" aria-label="V'Ride Energy Africa">
      {/* Stacked chevron / leaf mark */}
      <path d="M4 8 L15 8 L9.5 17 Z" fill="#3fae6b" />
      <path d="M11 17 L22 17 L16.5 26 Z" fill="#2f8fd6" />
      <path d="M4 8 L9.5 17 L4 17 Z" fill="#2f8fd6" opacity="0.85" />
      <text x="28" y="19" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="800" fill="#1b3f8f" letterSpacing="0.5">
        V&apos;RIDE
      </text>
      <text x="29" y="29" fontFamily="Inter, sans-serif" fontSize="7.2" fontWeight="700" fill="#3a4a63" letterSpacing="2.4">
        ENERGY AFRICA
      </text>
    </svg>
  );
}

function Camden() {
  return (
    <svg width="98" height="34" viewBox="0 0 98 34" fill="none" aria-label="Camden">
      <circle cx="16" cy="17" r="11" fill="none" stroke="#7a8f4a" strokeWidth="1.6" />
      <circle cx="16" cy="17" r="6.5" fill="#8ba153" />
      <path d="M16 9.5 L18.4 14.6 L24 15.2 L19.8 18.9 L21.1 24.3 L16 21.4 L10.9 24.3 L12.2 18.9 L8 15.2 L13.6 14.6 Z" fill="#f2f6e6" />
      <text x="34" y="22" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#5f7038" letterSpacing="1.2">
        CAMDEN
      </text>
    </svg>
  );
}

function CarePartners() {
  return (
    <svg width="116" height="34" viewBox="0 0 116 34" fill="none" aria-label="Care Partners">
      <circle cx="15" cy="17" r="11" fill="#e8642c" />
      <circle cx="15" cy="17" r="7" fill="#ffffff" />
      <path
        d="M15 13.4c1.1-1.6 3.6-1.2 3.6.7 0 1.7-2 3-3.6 4.3-1.6-1.3-3.6-2.6-3.6-4.3 0-1.9 2.5-2.3 3.6-.7z"
        fill="#e8642c"
      />
      <text x="31" y="15" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="800" fill="#2f3a4a" letterSpacing="1.4">
        CARE
      </text>
      <text x="31" y="26" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="800" fill="#e8642c" letterSpacing="1.4">
        PARTNERS
      </text>
    </svg>
  );
}

function Agcci() {
  return (
    <svg width="104" height="38" viewBox="0 0 104 38" fill="none" aria-label="AGCCI">
      {/* Faceted diamond mark */}
      <path d="M16 4 L26 12 L16 30 L6 12 Z" fill="#e8242c" />
      <path d="M16 4 L26 12 L16 16 Z" fill="#2f8fd6" />
      <path d="M16 4 L6 12 L16 16 Z" fill="#3fae6b" />
      <path d="M6 12 L16 16 L16 30 Z" fill="#f2b134" />
      <path d="M26 12 L16 16 L16 30 Z" fill="#7a4f9e" />
      <text x="33" y="19" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="800" fill="#2f3a4a" letterSpacing="0.6">
        AGCCI
      </text>
      <text x="34" y="28" fontFamily="Inter, sans-serif" fontSize="4.4" fontWeight="600" fill="#6b7280" letterSpacing="0.4">
        AUSTRALIA-GHANA CHAMBER OF COMMERCE
      </text>
      <text x="34" y="34" fontFamily="Inter, sans-serif" fontSize="4.4" fontWeight="600" fill="#6b7280" letterSpacing="0.4">
        AND INDUSTRY
      </text>
    </svg>
  );
}

function Sobaha() {
  return (
    <svg width="96" height="34" viewBox="0 0 96 34" fill="none" aria-label="Sobaha">
      <text
        x="4"
        y="24"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="21"
        fontStyle="italic"
        fontWeight="700"
        fill="#e8842c"
        letterSpacing="0.4"
      >
        Sobaha
      </text>
    </svg>
  );
}

const LOGOS = [VRide, Camden, CarePartners, Agcci, Sobaha];

export default function TrustStrip() {
  // Duplicate the set so the marquee can loop seamlessly at -50%.
  const loop = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="relative z-20 -mt-16 w-full rounded-t-[40px] bg-white pb-6 pt-7 shadow-[0_-14px_40px_-20px_rgba(0,0,0,0.65)]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-6 px-4 md:flex-row md:gap-8 md:px-10 lg:px-16">
        <p className="shrink-0 text-center text-[10px] font-semibold leading-[1.55] tracking-[0.11em] text-[#9aa0a6] md:text-right">
          TRUSTED BY
          <br />
          ORGANISATIONS
          <br />
          ACROSS AUSTRALIA
        </p>

        <div className="relative min-w-0 w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:w-auto">
          <div className="marquee-track items-center gap-[58px] pr-[58px]">
            {loop.map((Logo, i) => (
              <span key={i} className="flex shrink-0 items-center opacity-90">
                <Logo />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
