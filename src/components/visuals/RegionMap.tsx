/**
 * Representação estilizada (não cartográfica) de Salvador e região:
 * a península entre a Baía de Todos-os-Santos e o oceano Atlântico.
 */
const LAND =
  "M20 40 H500 V150 C 470 230, 430 300, 382 360 C 356 392, 336 420, 318 436 C 306 446, 292 444, 286 432 C 280 418, 292 400, 300 384 C 286 366, 262 356, 236 362 C 206 368, 184 352, 176 330 C 168 306, 142 294, 116 300 C 86 306, 56 292, 40 268 C 28 250, 20 232, 20 210 Z";

export function RegionMap() {
  return (
    <svg viewBox="0 0 520 520" className="h-auto w-full" role="img" aria-label="Mapa ilustrativo da área de atendimento: Salvador e região">
      <defs>
        <pattern id="rm-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.25" fill="#7fe3ff" fillOpacity=".5" />
        </pattern>
        <radialGradient id="rm-glow">
          <stop offset="0" stopColor="#00c8f5" stopOpacity=".4" />
          <stop offset="1" stopColor="#00c8f5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rm-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".35" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="rm-mask">
          <rect width="520" height="520" fill="url(#rm-fade)" />
        </mask>
      </defs>

      <circle cx="300" cy="404" r="200" fill="url(#rm-glow)" />
      <g mask="url(#rm-mask)">
        <path d={LAND} fill="url(#rm-dots)" />
        <path d={LAND} fill="none" stroke="#7fe3ff" strokeOpacity=".4" strokeWidth="1.2" />
        {/* Ilha estilizada na baía */}
        <path d="M150 372 C 166 360, 196 362, 204 376 C 210 390, 190 402, 170 400 C 152 398, 140 384, 150 372 Z" fill="url(#rm-dots)" stroke="#7fe3ff" strokeOpacity=".3" />
      </g>

      <text x="120" y="440" fill="#9fdcf5" fillOpacity=".6" fontSize="13" fontStyle="italic" fontFamily="var(--font-manrope)">
        Baía de Todos-os-Santos
      </text>
      <text x="430" y="470" fill="#9fdcf5" fillOpacity=".6" fontSize="13" fontStyle="italic" fontFamily="var(--font-manrope)" textAnchor="middle">
        Oceano Atlântico
      </text>

      {[70, 140, 210].map((r, i) => (
        <circle key={r} cx="304" cy="410" r={r} fill="none" stroke="#00c8f5" strokeOpacity={0.5 - i * 0.14} strokeDasharray="2 7" strokeLinecap="round" />
      ))}

      <circle cx="304" cy="410" r="14" fill="#00c8f5" fillOpacity=".3" style={{ animation: "pulse-ring 2.4s cubic-bezier(.16,1,.3,1) infinite", transformBox: "fill-box", transformOrigin: "center" }} />
      <circle cx="304" cy="410" r="7" fill="#00c8f5" />
      <circle cx="304" cy="410" r="3" fill="#fff" />

      <g>
        <rect x="318" y="372" width="92" height="32" rx="16" fill="#fff" />
        <text x="364" y="393" textAnchor="middle" fill="#041426" fontSize="14" fontWeight="700" fontFamily="var(--font-manrope)">
          Salvador
        </text>
      </g>
      <g>
        <rect x="236" y="214" width="130" height="30" rx="15" fill="none" stroke="#7fe3ff" strokeOpacity=".45" />
        <text x="301" y="234" textAnchor="middle" fill="#e6f9ff" fontSize="12" fontWeight="600" letterSpacing="1.5" fontFamily="var(--font-manrope)">
          REGIÃO
        </text>
      </g>
    </svg>
  );
}
