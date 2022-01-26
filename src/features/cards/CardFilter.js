import React, { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { Input } from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { filterUpdated } from "./cardsSlice";
import debounce from "lodash.debounce";

export const CardFilter = ({ className }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(
    useSelector((state) => state.cards.filter)
  );

  //debounce to avoid irrelevant searches
  const debouncedSearch = useMemo(() => {
    return debounce((filter, dispatch) => {
      dispatch(filterUpdated(filter));
    }, 500);
  }, []);

  useEffect(() => {
    debouncedSearch(filter, dispatch);
  }, [filter, dispatch, debouncedSearch]);

  const handleSearch = (e) => {
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
