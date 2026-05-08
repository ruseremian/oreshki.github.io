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
    root: "h-10 w-[3.75rem] sm:h-12 sm:w-[4.5rem]"
  },
  sm: {
    root: "h-14 w-[5.25rem]"
  },
  md: {
    root: "h-20 w-[7.5rem]"
  },
  lg: {
    root: "h-24 w-36"
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
        sizes="(max-width: 640px) 60px, 120px"
        className="object-contain"
        priority={size === "xs"}
      />
    </span>
  );
}
