import * as Icons from "lucide-react";
import { HelpCircle, type LucideIcon, type LucideProps } from "lucide-react";

type IconName = keyof typeof Icons;

/** Looks up a Lucide icon by the string name stored on `Life.icon`, falling
 * back to a generic icon if content ever references an unknown one. Icon
 * exports are `forwardRef` components (typeof "object"), not functions, so
 * we can't gate on `typeof === "function"` here. */
export function LifeIcon({ name, ...props }: { name: string } & LucideProps) {
  const Comp = (Icons as unknown as Record<IconName, LucideIcon>)[name as IconName];
  const Resolved = Comp ?? HelpCircle;
  return <Resolved {...props} />;
}
