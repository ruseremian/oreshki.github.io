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
    root: "h-11 w-32 sm:h-14 sm:w-40"
  },
  sm: {
    root: "h-20 w-56"
  },
  md: {
    root: "h-24 w-64"
  },
  lg: {
    root: "h-28 w-72"
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
