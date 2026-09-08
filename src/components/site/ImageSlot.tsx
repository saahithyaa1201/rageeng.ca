import { cn } from "@/lib/utils";

type Props = {
  /** Drop your own image URL here (or import from src/assets). */
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  overlay?: boolean;
};

/**
 * Replaceable image slot. Until a `src` is supplied it renders a neutral
 * placeholder with the intended subject label, so layouts stay intact.
 */
export function ImageSlot({ src, alt, label, className, imgClassName, overlay }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,var(--color-surface)_0px,var(--color-surface)_14px,var(--color-muted)_14px,var(--color-muted)_28px)]">
          <span className="eyebrow rounded-full bg-card/80 px-4 py-2 text-center">
            {label ?? alt}
          </span>
        </div>
      )}
      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
      ) : null}
    </div>
  );
}
