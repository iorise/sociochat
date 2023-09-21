import { cva, type VariantProps } from "class-variance-authority";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const avatarVariants = cva("hover:cursor-pointer", {
  variants: {
    variant: {
      focus:
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
    },
    size: {
      default: "w-8 h-8 md:h-10 md:w-10",
      xl: "w-36 h-36",
      lg: "w-24 h-24",
      md: "w-8 h-8 md:h-10 md:w-10",
      sm: "w-6 h-6 md:w-8 md:h-8",
      xs: "w-7 h-7",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src: string;
  alt?: string;
  className?: string;
}

export function UserAvatar({
  src,
  alt,
  size,
  className,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar className={cn(avatarVariants({ size }), className)} {...props}>
      <AvatarImage src={src} alt={alt} />
    </Avatar>
  );
}
