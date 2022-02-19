import React, { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { Input } from "../../common/components/Input";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { filterUpdated } from "./state/cardsSlice";
import { debounce } from "lodash";
import { AppDispatch } from "../../store";

type CardFilterProps = { className?: string };

export const CardFilter = ({ className }: CardFilterProps) => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState(
    useAppSelector((state) => state.cards.filter)
  );

  //debounce to avoid irrelevant searches
  const debouncedSearch = useMemo(() => {
    return debounce((filter: string, dispatch: AppDispatch) => {
      dispatch(filterUpdated(filter));
    }, 500);
  }, []);

  useEffect(() => {
    debouncedSearch(filter, dispatch);
  }, [filter, dispatch, debouncedSearch]);

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
