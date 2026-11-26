/** Selo promocional circular com profundidade (CSS 3D + texto em órbita). */
export function PromoSeal({ percent, size = "lg", className = "" }: { percent: number; size?: "sm" | "lg"; className?: string }) {
  const dim = size === "lg" ? "size-36 sm:size-44" : "size-20";
  const id = `seal-${size}`;
  return (
    <div className={`seal-3d ${dim} ${className}`} aria-hidden="true">
      <div className="seal-face">
        <svg viewBox="0 0 200 200" className="seal-ring absolute inset-0 h-full w-full">
          <defs>
            <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text fill="#fff" fillOpacity=".85" fontSize="14" fontWeight="700" letterSpacing="4.2" fontFamily="var(--font-manrope)">
            <textPath href={`#${id}`}>BLACK FRIDAY • PH FILTROS • BLACK FRIDAY • PH FILTROS •</textPath>
          </text>
        </svg>
        <div className="relative z-10 text-center leading-none">
          <span className={`font-display block font-bold tracking-[-0.06em] text-white ${size === "lg" ? "text-5xl sm:text-6xl" : "text-xl"}`}>
            {percent}%
          </span>
          <span className={`font-display block font-bold tracking-[0.2em] text-[var(--cmp-accent)] ${size === "lg" ? "mt-1 text-sm" : "text-[0.5rem]"}`}>OFF</span>
        </div>
      </div>
    </div>
  );
}
