import { useMemo, useEffect, useState } from "react";
import { filterUpdated } from "../state/cardsSlice";
import { debounce } from "lodash";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { AppDispatch } from "../../../store";
import { useAppSelector } from "../../../common/hooks/useAppSelector";

//debounce to avoid irrelevant searches
export const useDebouncedFilter = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [filter, setFilter] = useState(
    useAppSelector((state) => state.cards.filter)
  );

  const dispatch = useAppDispatch();
  const debouncedSearch = useMemo(() => {
    return debounce((filter: string, dispatch: AppDispatch) => {
      dispatch(filterUpdated(filter));
    }, 500);
  }, []);

  useEffect(() => {
    debouncedSearch(filter, dispatch);
  }, [filter, dispatch, debouncedSearch]);

  return [filter, setFilter];
};
