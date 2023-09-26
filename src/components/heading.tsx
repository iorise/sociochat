import { cva, type VariantProps } from "class-variance-authority";
import { Balancer } from "react-wrap-balancer";

import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Heading({
  className,
  children,
  as: Comp = "section",
  ...props
}: PageHeaderProps) {
  return (
    <Comp className={cn("grid gap-1", className)} {...props}>
      {children}
    </Comp>
  );
}

const headingVariants = cva(
  "font-bold leading-tight tracking-tighter lg:leading-[1.1] h-14 items-center px-3 flex bg-background border-b border-r",
  {
    variants: {
      size: {
        default: "text-xl md:text-3xl",
        sm: "text-2xl md:text-3xl",
        lg: "text-4xl md:text-5xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function PageHeaderHeading({
  className,
  size,
  as: Comp = "h1",
  ...props
}: PageHeaderHeadingProps) {
  return (
    <Comp className={cn(headingVariants({ size, className }))} {...props} />
  );
}
