import React from "react";
import cn from "classnames";

export const Input = React.forwardRef(
  (
    {
      type = "text",
      className = "",
      ...props
    }: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className={cn(
          className,
          "border rounded-none placeholder-opacity-100 px-4 py-2 text-center bg-gray-light text-gray placeholder-gray focus:border-gray"
        )}
        type={type}
        {...props}
      />
    );
  }
);
