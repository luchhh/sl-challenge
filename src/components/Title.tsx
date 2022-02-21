import React from "react";

export const Title = ({
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className="font-title sm:text-4xl text-3xl">{children}</h1>;
};

export const TitleSm = ({
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className="font-title sm:text-3xl text-2xl">{children}</h1>;
};
