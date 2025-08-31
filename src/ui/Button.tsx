import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "dark" | "danger" | "light";
type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text inside the button */
  children?: ReactNode;
  /** Icon component (ReactNode) or image/svg path string */
  icon?: ReactNode | string;
  /** Color/style variant */
  variant?: ButtonVariant;
  /** Size (sm for the small “Edit” style) */
  size?: ButtonSize;
  /** Extra classes */
  className?: string;
}

export default function Button({
  children,
  icon,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const base =
    "flex items-center justify-center gap-5 rounded-full font-semigold leading-none " +
    "transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-[#7C5DFA]";

  const sizeStyles: Record<ButtonSize, string> = {
    md: "px-6 py-5 text-[1.4rem]",
    sm: "px-4 py-2 text-sm",
  };

  // Colors taken from your design
  const variants: Record<ButtonVariant, string> = {
    // Purple (New Invoice / Mark as Paid)
    primary: "bg-[#7C5DFA] text-white hover:bg-[#9277FF]",
    // Light (Add New Item, light Edit)
    secondary:
      "bg-[#F9FAFE] text-[#7E88C3] dark:text-[#DFE3FA]  bg-primary-gray100 dark:bg-[#252945] hover:bg-[#DFE3FA]",
    light: "bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA]",
    // Dark (Save as Draft)
    dark: "bg-[#252945] text-[#888EB0] hover:bg-[#0C0E16]",
    // Red (Delete)
    danger: "bg-[#EC5757] text-white hover:bg-[#FF9797]",
  };

  const iconSizes: Record<ButtonSize, string> = {
    md: "w-10 h-10",
    sm: "w-4 h-4",
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "string") {
      // path to svg/png
      return <img src={icon} alt="" className={iconSizes[size]} aria-hidden />;
    }
    return <span className={clsx("shrink-0", iconSizes[size])}>{icon}</span>;
  };

  return (
    <button
      className={clsx(base, sizeStyles[size], variants[variant], className)}
      {...props}
    >
      {renderIcon()}
      {children && <span>{children}</span>}
    </button>
  );
}
