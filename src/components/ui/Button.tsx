import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
      ghost:
        "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm gap-1.5",
      md: "h-10 px-4 py-2 text-sm gap-2",
      lg: "h-11 px-8 text-base gap-2",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div
            className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
