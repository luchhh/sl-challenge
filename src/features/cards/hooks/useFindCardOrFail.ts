import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectCardById } from "../state/cardsSlice";

export const useFindCardOrFail = (cardId: string) => {
  const card = useAppSelector((state) => selectCardById(state, cardId));
  if (card) {
    return card;
  } else {
    throw Error(`Card ${cardId} not found`);
  }
};
