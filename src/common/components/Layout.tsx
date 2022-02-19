import React from "react";
import cn from "classnames";

type LayoutProps = { children: React.ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={cn("w-full bg-white")}>
      <div
        className={cn("min-h-screen flex flex-col items-center pt-16 md:pt-24")}
      >
        {children}
      </div>
    </div>
  );
};
