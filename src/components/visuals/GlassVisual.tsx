/** Copo d'água ilustrado com bolhas e reflexos (vetorial). */
export function GlassVisual() {
  return (
    <svg viewBox="0 0 400 480" className="h-auto w-full" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="gv-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fe3ff" stopOpacity=".55" />
          <stop offset="1" stopColor="#007bdb" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="gv-glass" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset=".15" stopColor="#fff" stopOpacity=".25" />
          <stop offset=".8" stopColor="#fff" stopOpacity=".2" />
          <stop offset="1" stopColor="#fff" stopOpacity=".75" />
        </linearGradient>
        <radialGradient id="gv-shadow">
          <stop offset="0" stopColor="#007bdb" stopOpacity=".28" />
          <stop offset="1" stopColor="#007bdb" stopOpacity="0" />
        </radialGradient>
        <clipPath id="gv-clip">
          <path d="M112 90h176l-22 330a22 22 0 0 1-22 20H156a22 22 0 0 1-22-20L112 90Z" />
        </clipPath>
      </defs>
      <ellipse cx="200" cy="452" rx="150" ry="18" fill="url(#gv-shadow)" />
      <g clipPath="url(#gv-clip)">
        <rect x="100" y="90" width="200" height="360" fill="#e9f6ff" fillOpacity=".5" />
        <rect x="100" y="170" width="200" height="290" fill="url(#gv-water)" />
        <g style={{ animation: "wave-x 7s linear infinite" }}>
          <path d="M100 170c20-7 40-7 60 0s40 7 60 0 40-7 60 0 40 7 60 0 40-7 60 0 40 7 60 0v14H100z" fill="#bff3ff" fillOpacity=".7" />
        </g>
        {[150, 180, 214, 238, 262].map((x, i) => (
          <circle key={x} cx={x} cy={430} r={2 + (i % 3)} fill="#fff" fillOpacity=".85" style={{ animation: `bubble ${5 + i * 0.7}s ease-in ${i * 0.9}s infinite` }} />
        ))}
        <rect x="128" y="90" width="12" height="340" fill="#fff" fillOpacity=".45" transform="rotate(-3.8 134 260)" />
      </g>
      <path d="M112 90h176l-22 330a22 22 0 0 1-22 20H156a22 22 0 0 1-22-20L112 90Z" stroke="url(#gv-glass)" strokeWidth="3" />
      <ellipse cx="200" cy="90" rx="88" ry="10" stroke="#fff" strokeOpacity=".9" strokeWidth="2" />
      {/* gota caindo */}
      <path d="M200 20c6 8 9.5 13 9.5 17.5a9.5 9.5 0 0 1-19 0c0-4.5 3.5-9.5 9.5-17.5Z" fill="#00c8f5" style={{ animation: "float 4s ease-in-out infinite" }} />
    </svg>
  );
}
