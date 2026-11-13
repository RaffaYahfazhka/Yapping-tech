import Image from "next/image";

interface YappingLogoProps {
  className?: string;
  variant?: "dark" | "light";
  markOnly?: boolean;
  wordmarkOnly?: boolean;
  height?: number;
}

export function YappingLogo({
  className = "",
  variant = "light",
  markOnly = false,
  wordmarkOnly = false,
  height = 30,
}: YappingLogoProps) {
  const isDark = variant === "dark";

  // Mark only (YT ribbon emblem)
  if (markOnly) {
    const markWidth = Math.round(height * 1.344);
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <Image
          src="/images/logo/yapping-techflow/yapping-techflow-mark.png"
          alt="Yapping Techflow Mark"
          width={markWidth}
          height={height}
          priority
          className={`h-auto w-auto object-contain transition-all ${
            isDark ? "brightness-110 drop-shadow-[0_2px_12px_rgba(56,189,248,0.25)]" : ""
          }`}
          style={{ height: `${height}px`, width: "auto" }}
        />
      </div>
    );
  }

  // Wordmark only ("Yapping Techflow")
  if (wordmarkOnly) {
    const wordmarkWidth = Math.round(height * 7.733);
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <Image
          src="/images/logo/yapping-techflow/yapping-techflow-wordmark.png"
          alt="Yapping Techflow Wordmark"
          width={wordmarkWidth}
          height={height}
          priority
          className={`h-auto w-auto object-contain transition-all ${
            isDark ? "brightness-125 invert-[0.85] hue-rotate-180" : ""
          }`}
          style={{ height: `${height}px`, width: "auto" }}
        />
      </div>
    );
  }

  // Full Logo (Mark + Wordmark)
  const fullWidth = Math.round(height * 6.89);
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/images/logo/yapping-techflow/yapping-techflow-full.png"
        alt="Yapping Techflow"
        width={fullWidth}
        height={height}
        priority
        className={`h-auto w-auto object-contain transition-all ${
          isDark ? "brightness-110 drop-shadow-[0_2px_14px_rgba(56,189,248,0.2)]" : ""
        }`}
        style={{ height: `${height}px`, width: "auto" }}
      />
    </div>
  );
}
