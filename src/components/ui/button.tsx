import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
      },
      hasIcon: {
        true: "[&_svg]:size-4 [&_svg]:shrink-0",
        false: "",
      },
      iconGap: {
        default: "gap-2",
        sm: "gap-1.5",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      iconPosition: "left",
      hasIcon: false,
      iconGap: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    iconPosition,
    iconGap,
    asChild = false, 
    leftIcon,
    rightIcon,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const hasIcon = Boolean(leftIcon || rightIcon)
    const iconToRender = iconPosition === "left" ? leftIcon || rightIcon : rightIcon || leftIcon

    return (
      <Comp
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            iconPosition: hasIcon ? iconPosition : undefined,
            hasIcon,
            iconGap: hasIcon ? iconGap : undefined,
            className 
          })
        )}
        ref={ref}
        {...props}
      >
        {iconToRender}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }