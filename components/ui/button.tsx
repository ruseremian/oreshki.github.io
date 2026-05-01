import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-cocoa text-cream shadow-soft hover:-translate-y-0.5 hover:bg-espresso focus-visible:outline-caramel",
        secondary:
          "border border-cocoa/15 bg-white/70 text-cocoa backdrop-blur hover:-translate-y-0.5 hover:border-caramel/40 hover:bg-white focus-visible:outline-caramel",
        ghost:
          "text-cocoa hover:bg-cocoa/5 focus-visible:outline-caramel"
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4 text-xs"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
