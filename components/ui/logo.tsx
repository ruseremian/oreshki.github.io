import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg";

type LogoProps = {
  size?: LogoSize;
  showSubtitle?: boolean;
  monochrome?: boolean;
  className?: string;
};

const sizeStyles: Record<
  LogoSize,
  {
    root: string;
    icon: string;
    wordmark: string;
    subtitle: string;
    gap: string;
  }
> = {
  xs: {
    root: "w-[5.65rem]",
    icon: "h-5 w-5",
    wordmark: "text-[1.05rem]",
    subtitle: "text-[0.38rem] leading-[0.58rem]",
    gap: "gap-1"
  },
  sm: {
    root: "w-[6.75rem]",
    icon: "h-6 w-6",
    wordmark: "text-xl",
    subtitle: "text-[0.45rem] leading-[0.68rem]",
    gap: "gap-1"
  },
  md: {
    root: "w-[8.5rem]",
    icon: "h-9 w-9",
    wordmark: "text-3xl",
    subtitle: "text-[0.56rem] leading-[0.82rem]",
    gap: "gap-1.5"
  },
  lg: {
    root: "w-[11rem]",
    icon: "h-12 w-12",
    wordmark: "text-4xl",
    subtitle: "text-[0.66rem] leading-[0.95rem]",
    gap: "gap-2"
  }
};

export function Logo({
  size = "md",
  showSubtitle = true,
  monochrome = false,
  className
}: LogoProps) {
  const styles = sizeStyles[size];

  return (
    <span
      role="img"
      aria-label="Oreshki artisan bakery logo"
      className={cn(
        "inline-flex shrink-0 flex-col items-center text-center",
        styles.root,
        styles.gap,
        monochrome ? "text-current" : "text-cocoa",
        className
      )}
    >
      <WalnutMark className={styles.icon} monochrome={monochrome} />
      <span
        className={cn(
          "font-serif font-semibold uppercase leading-none tracking-[0.14em]",
          styles.wordmark
        )}
      >
        ORESHKI
      </span>
      {showSubtitle ? (
        <span
          className={cn(
            "flex flex-col font-sans font-semibold uppercase tracking-[0.22em]",
            monochrome ? "text-current opacity-80" : "text-caramel",
            styles.subtitle
          )}
        >
          <span>DOUCEUR ARTISANALE</span>
          <span>FAITE MAISON</span>
        </span>
      ) : null}
    </span>
  );
}

function WalnutMark({
  className,
  monochrome
}: {
  className?: string;
  monochrome: boolean;
}) {
  const shell = monochrome ? "currentColor" : "#432719";
  const fill = monochrome ? "currentColor" : "#b97836";
  const highlight = monochrome ? "currentColor" : "#dfc29c";

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 7.5c-9.7 0-17.8 7.7-17.8 17.4 0 13 12.9 21.9 17.8 31.6 4.9-9.7 17.8-18.6 17.8-31.6C49.8 15.2 41.7 7.5 32 7.5Z"
        fill={highlight}
      />
      <path
        d="M32 10.4c-8.1 0-14.8 6.4-14.8 14.5 0 11.2 10.5 18.8 14.8 26.8 4.3-8 14.8-15.6 14.8-26.8 0-8.1-6.7-14.5-14.8-14.5Z"
        fill={fill}
      />
      <path
        d="M32 10.4v41.3M24.5 17.4c3.1 2 4.9 5 4.9 8.2 0 4.9-4.5 8.7-8.8 10.6M39.5 17.4c-3.1 2-4.9 5-4.9 8.2 0 4.9 4.5 8.7 8.8 10.6M23.3 28.2c2.8.5 5.4 1.8 7.2 3.9M40.7 28.2c-2.8.5-5.4 1.8-7.2 3.9"
        stroke={shell}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7 45.2c3.7 3.4 8.5 5.4 13.3 5.4s9.6-2 13.3-5.4"
        stroke={shell}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
