import Link from "next/link";
import type { ComponentProps } from "react";
import { ctaClassName, type ButtonVariant } from "@/components/common/PrimaryButton";

type Props = ComponentProps<typeof Link> & { variant?: ButtonVariant };

/** Same visual as PrimaryButton but renders as a single `<a>` (via next/link)
 * instead of nesting a `<button>` inside it. */
export function LinkButton({ variant = "primary", className = "", ...rest }: Props) {
  return <Link className={ctaClassName(variant, className)} {...rest} />;
}
