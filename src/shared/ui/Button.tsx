import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
  disabled = false,
  type,
}) => {
  const variants = {
    primary: "bg-primary text-[#C9CCCF] hover:bg-primary/90 focus:ring-primary/50",
    secondary: "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary/50",
  };

  const sizes = {
    small: "px-4 py-2.5 text-[14px] font-bold",
    medium: "px-4 py-3 text-[17px] font-bold",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={clsx(
        "rounded-2xl transition-colors cursor-pointer",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
