import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function ctaClassName(variant: ButtonVariant = "primary", className = ""): string {
  const base =
    "h-[52px] w-full rounded-cta text-base font-medium transition active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center";
  const styles =
    variant === "primary" ? "bg-primary text-on-primary" : "bg-transparent border border-border text-text";
  return `${base} ${styles} ${className}`;
}

/** 52px tall CTA per design-system MASTER.md. One per screen for `primary`. */
export function PrimaryButton({ variant = "primary", className = "", ...rest }: Props) {
  return <button className={ctaClassName(variant, className)} {...rest} />;
}
