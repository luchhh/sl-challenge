import React from "react";
import cn from "classnames";

export const Input = React.forwardRef(
  (
    {
      name,
      placeholder,
      value,
      isDisabled,
      onClick,
      onChange,
      onBlur,
      onFocus,
      hasError,
      type = "text",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={cn(
          className,
          "border rounded-none placeholder-opacity-100 px-4 py-2 text-center bg-gray-light text-gray placeholder-gray focus:border-gray"
        )}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
        placeholder={placeholder}
        disabled={isDisabled && "disabled"}
        {...props}
      />
    );
  }
);
