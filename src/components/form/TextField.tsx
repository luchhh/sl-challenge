import React from "react";
import cn from "classnames";
import { Input } from "../Input";

type InputProps = React.ComponentPropsWithRef<typeof Input>;
type TextFieldProps = Omit<InputProps, "type">; //omit type, as it only can be text

export const TextField = ({
  className = "",
  ref,
  ...props
}: TextFieldProps) => {
  return (
    <Input
      type="text"
      ref={ref}
      className={cn("uppercase", className)}
      {...props}
    />
  );
};
