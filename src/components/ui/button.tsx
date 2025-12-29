import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover rounded-none border-2 border-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none",
        outline: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background rounded-none",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-none border-2 border-secondary",
        ghost: "hover:bg-muted hover:text-foreground rounded-none",
        link: "text-foreground underline-offset-4 hover:underline p-0 h-auto",
        accent: "bg-accent text-accent-foreground hover:bg-accent-hover rounded-none border-2 border-accent",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-5",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
