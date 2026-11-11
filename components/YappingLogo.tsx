export function YappingLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon: Sleek rounded black container with glowing cyan/green tech ring */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black shadow-sm ring-1 ring-black/5">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          {/* Outer glowing technical ring with aperture break */}
          <circle
            cx="16"
            cy="16"
            r="10"
            stroke="url(#yappingRingGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="46 14"
            className="transform -rotate-45 origin-center"
          />
          {/* Inner solid tech dot */}
          <circle cx="16" cy="16" r="3.5" fill="#38bdf8" />
          
          <defs>
            <linearGradient id="yappingRingGrad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Styled Modern Typography */}
      <div className="flex items-baseline tracking-tight font-jakarta">
        <span className="text-[15px] font-black text-stone-950">yapping</span>
        <span className="text-[15px] font-normal text-stone-500">techflow</span>
        <span className="text-[15px] font-extrabold text-emerald-500">.</span>
      </div>
    </div>
  );
}
