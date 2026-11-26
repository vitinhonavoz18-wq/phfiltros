import Image from "next/image";

/**
 * Composição principal do hero: a gota da marca flutuando sobre um
 * cartucho filtrante de vidro, com gotejamento, ondas e bolhas.
 * 100% vetorial + CSS (leve, nítido em qualquer tela).
 */
export function HeroVisual() {
  const bubbles = [
    { x: 150, r: 3, d: 0, t: 6 },
    { x: 182, r: 2, d: 1.8, t: 5.2 },
    { x: 232, r: 2.5, d: 3.1, t: 6.4 },
    { x: 266, r: 1.8, d: 0.9, t: 4.8 },
    { x: 205, r: 3.4, d: 2.4, t: 7 },
    { x: 286, r: 2.2, d: 4, t: 5.6 },
  ];
  return (
    <div className="relative mx-auto aspect-[420/640] w-full max-w-[420px] select-none" aria-hidden="true">
      {/* Glow ambiente */}
      <div className="absolute left-1/2 top-[38%] size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,245,.22),rgba(0,123,219,.10)_45%,transparent_70%)]" />

      {/* Gota da marca */}
      <div className="absolute left-1/2 top-0 w-[34%] -translate-x-1/2 animate-float">
        <Image src="/brand/ph-drop-lg.webp" alt="" width={480} height={720} priority sizes="160px" className="h-auto w-full drop-shadow-[0_20px_50px_rgba(0,200,245,.35)]" />
      </div>

      <svg viewBox="0 0 420 640" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <linearGradient id="hv-glass" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".16" />
            <stop offset=".18" stopColor="#fff" stopOpacity=".04" />
            <stop offset=".7" stopColor="#fff" stopOpacity=".02" />
            <stop offset=".92" stopColor="#fff" stopOpacity=".14" />
            <stop offset="1" stopColor="#fff" stopOpacity=".05" />
          </linearGradient>
          <linearGradient id="hv-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00c8f5" stopOpacity=".55" />
            <stop offset=".5" stopColor="#0a8ee6" stopOpacity=".55" />
            <stop offset="1" stopColor="#043a78" stopOpacity=".85" />
          </linearGradient>
          <linearGradient id="hv-cap" x1="0" x2="1">
            <stop offset="0" stopColor="#0c2c4d" />
            <stop offset=".25" stopColor="#5f86a8" />
            <stop offset=".45" stopColor="#d9e8f5" />
            <stop offset=".6" stopColor="#6d93b4" />
            <stop offset="1" stopColor="#0a223d" />
          </linearGradient>
          <linearGradient id="hv-core" x1="0" x2="1">
            <stop offset="0" stopColor="#e8f4ff" stopOpacity=".05" />
            <stop offset=".5" stopColor="#e8f4ff" stopOpacity=".28" />
            <stop offset="1" stopColor="#e8f4ff" stopOpacity=".05" />
          </linearGradient>
          <pattern id="hv-pleat" width="8" height="10" patternUnits="userSpaceOnUse">
            <path d="M4 0v10" stroke="#cfeaff" strokeOpacity=".35" strokeWidth="1" />
          </pattern>
          <clipPath id="hv-body">
            <rect x="110" y="300" width="200" height="270" rx="22" />
          </clipPath>
          <radialGradient id="hv-floor">
            <stop offset="0" stopColor="#00c8f5" stopOpacity=".55" />
            <stop offset="1" stopColor="#00c8f5" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Reflexo no "chão" */}
        <ellipse cx="210" cy="612" rx="170" ry="16" fill="url(#hv-floor)" />

        {/* Gotejamento */}
        <g style={{ transformBox: "fill-box" }}>
          {[0, 1.6].map((delay) => (
            <path
              key={delay}
              d="M210 232c4 5.5 6.5 9.2 6.5 12.4a6.5 6.5 0 0 1-13 0c0-3.2 2.5-6.9 6.5-12.4Z"
              fill="#8fe8ff"
              style={{ animation: `drip 3.2s cubic-bezier(.55,0,1,.45) ${delay}s infinite`, transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </g>

        {/* Tampa superior */}
        <rect x="100" y="282" width="220" height="30" rx="10" fill="url(#hv-cap)" />
        <rect x="100" y="282" width="220" height="5" rx="2.5" fill="#fff" fillOpacity=".35" />

        {/* Corpo de vidro */}
        <g clipPath="url(#hv-body)">
          <rect x="110" y="300" width="200" height="270" fill="url(#hv-glass)" />
          {/* Água */}
          <g>
            <rect x="110" y="352" width="200" height="230" fill="url(#hv-water)" />
            <g style={{ animation: "wave-x 6s linear infinite" }}>
              <path
                d="M110 352c25-9 50-9 75 0s50 9 75 0 50-9 75 0 50 9 75 0 50-9 75 0 50 9 75 0v18H110z"
                fill="#5fdcff"
                fillOpacity=".45"
              />
            </g>
            <g style={{ animation: "wave-x 9s linear infinite reverse" }}>
              <path d="M110 356c30 7 60 7 90 0s60-7 90 0 60 7 90 0 60-7 90 0 60 7 90 0v14H110z" fill="#00c8f5" fillOpacity=".35" />
            </g>
          </g>
          {/* Núcleo filtrante plissado */}
          <rect x="172" y="312" width="76" height="246" rx="10" fill="url(#hv-pleat)" />
          <rect x="172" y="312" width="76" height="246" rx="10" fill="url(#hv-core)" />
          {/* Bolhas */}
          {bubbles.map((b, i) => (
            <circle
              key={i}
              cx={b.x}
              cy={560}
              r={b.r}
              fill="#e6faff"
              fillOpacity=".8"
              style={{ animation: `bubble ${b.t}s ease-in ${b.d}s infinite` }}
            />
          ))}
          {/* Brilhos verticais */}
          <rect x="122" y="300" width="14" height="270" fill="#fff" fillOpacity=".10" />
          <rect x="140" y="300" width="4" height="270" fill="#fff" fillOpacity=".12" />
          <rect x="290" y="300" width="6" height="270" fill="#fff" fillOpacity=".08" />
        </g>
        <rect x="110" y="300" width="200" height="270" rx="22" stroke="#bfefff" strokeOpacity=".28" />

        {/* Ondas na superfície onde a gota cai */}
        {[0, 1.6].map((delay) => (
          <ellipse
            key={delay}
            cx="210"
            cy="354"
            rx="46"
            ry="7"
            stroke="#bff3ff"
            strokeWidth="1.5"
            style={{ animation: `ripple-out 3.2s ease-out ${delay + 1.25}s infinite`, transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}

        {/* Tampa inferior */}
        <rect x="100" y="560" width="220" height="30" rx="10" fill="url(#hv-cap)" />
        <rect x="196" y="590" width="28" height="14" rx="3" fill="url(#hv-cap)" />
      </svg>
    </div>
  );
}
