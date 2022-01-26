import React from "react";
import cn from "classnames";
import { Input } from "../Input";

export const TextField = ({ children, ...rest }) => {
  return (
    <>
      <Input className="uppercase" {...rest} />
    </>
  );
};
