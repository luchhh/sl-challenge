import React from "react";
import cn from "classnames";

export const Layout = ({ children }) => {
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
