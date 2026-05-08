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
    root: "h-11 w-28 sm:h-14 sm:w-36"
  },
  sm: {
    root: "h-20 w-48"
  },
  md: {
    root: "h-24 w-56"
  },
  lg: {
    root: "h-28 w-64"
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
        src="/branding/oreshki-logo.png"
        alt="Oreshki logo"
        fill
        sizes="(max-width: 640px) 112px, 224px"
        className="translate-y-[28%] scale-[3.2] object-contain"
        priority={size === "xs"}
      />
    </span>
  );
}
