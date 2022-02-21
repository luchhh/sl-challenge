import React from "react";
import cn from "classnames";
import { Input } from "../../../components/Input";
import { useDebouncedFilter } from "../hooks/useDebouncedFilter";

type CardFilterProps = { className?: string };

export const CardFilter = ({ className }: CardFilterProps) => {
  const [filter, setFilter] = useDebouncedFilter();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Input
      value={filter}
      onChange={handleSearch}
      placeholder="Filter cards..."
      className={cn("xl:w-1/4 md:w-1/2 w-10/12", className)}
      autoFocus
    />
  );
};
