import Image from "next/image";

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
  }
> = {
  xs: {
    root: "h-9 w-28 min-[360px]:w-32 sm:h-12 sm:w-52"
  },
  sm: {
    root: "h-12 w-48 sm:h-14 sm:w-60"
  },
  md: {
    root: "h-14 w-52 sm:h-16 sm:w-72"
  },
  lg: {
    root: "h-16 w-60 sm:h-20 sm:w-80"
  }
};

export function Logo({
  size = "md",
  className
}: LogoProps) {
  const styles = sizeStyles[size];

  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden",
        styles.root,
        className
      )}
    >
      <Image
        src="/branding/oreshki-logo.svg"
        alt="Oreshki logo"
        fill
        sizes="(max-width: 640px) 128px, 288px"
        className="object-contain"
        priority={size === "xs"}
      />
    </span>
  );
}
