import React from "react";
import cn from "classnames";

const getSizeStyle = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "font-semibold h-8 text-sm leading-none";
    case "md":
      return "font-semibold h-10 text-lg leading-none";
    default:
      return "font-semibold h-12 text-lg";
  }
};

type ButtonProps = {
  size?: "sm" | "md" | "lg";
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const Button = ({
  children,
  disabled,
  size = "lg",
  className,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        disabled && "bg-gray",
        "font-title",
        getSizeStyle(size),
        "rounded-full px-4 py-2",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
