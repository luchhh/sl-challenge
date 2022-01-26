import React from "react";
import { Button } from "./Button";
import cn from "classnames";

export const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={cn(
        className,
        "bg-emerald-500 text-white hover:bg-emerald-600 px-8"
      )}
    >
      {children}{" "}
    </Button>
  );
};
