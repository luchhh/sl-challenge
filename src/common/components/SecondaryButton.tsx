import React from "react";
import { Button } from "./Button";
import cn from "classnames";

export const SecondaryButton = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      {...props}
      className={cn(
        className,
        "uppercase border bg-white text-black hover:bg-white-600 px-8"
      )}
    >
      {children}
    </Button>
  );
};
