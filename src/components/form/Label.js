import React from "react";
import cn from "classnames";

export const Label = ({ children, className }) => (
  <label className={cn(className, "font-bold text-xss")}>{children}</label>
);
