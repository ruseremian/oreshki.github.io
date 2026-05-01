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
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-caramel">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl leading-tight text-cocoa sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-cocoa/70">{description}</p>
      ) : null}
    </div>
  );
}
