import React from "react";
import cn from "classnames";

function getHeightStyle(heightClass) {
  switch (heightClass) {
    case "sm":
      return "font-semibold h-8 text-sm leading-none";
    case "md":
      return "font-semibold h-10 text-lg leading-none";
    default:
      return "font-semibold h-12 text-lg";
  }
}

export const Button = ({
  children,
  onClick,
  isDisabled,
  heightClass = "lg",
  className = "",
  ...props
}) => {
  return (
    <button
      className={cn(
        isDisabled && "bg-gray",
        "font-title",
        getHeightStyle(heightClass),
        "rounded-full px-4 py-2",
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
