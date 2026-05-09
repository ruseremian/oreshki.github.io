import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center"
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "mx-0 text-left"
      )}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-caramel sm:tracking-[0.28em]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-[2rem] leading-tight text-cocoa sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-cocoa/70 sm:mt-5 sm:leading-8">{description}</p>
      ) : null}
    </div>
  );
}
