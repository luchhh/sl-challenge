import React from "react";
import cn from "classnames";

export const Title = ({ children }) => {
  return <h1 className="font-title sm:text-4xl text-3xl">{children}</h1>;
};

export const TitleSm = ({ children }) => {
  return <h1 className="font-title sm:text-3xl text-2xl">{children}</h1>;
};
