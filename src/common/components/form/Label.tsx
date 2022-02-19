import React from "react";
import cn from "classnames";

type LabelProps = { children: React.ReactNode; className?: string };

export const Label = ({
  children,
  className,
}: LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn(className, "font-bold text-xss")}>{children}</label>
);
