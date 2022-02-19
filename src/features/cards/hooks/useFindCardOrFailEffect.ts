import { useEffect } from "react";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import { selectAllCards, selectCardById } from "../state/cardsSlice";
import { Card } from "../types";

export const useFindCardOrFailEffect = (
  cardId: string,
  effect: (card: Card) => void
) => {
  const allCards = useAppSelector(selectAllCards);
  const card = useAppSelector((state) => selectCardById(state, cardId));
  useEffect(() => {
    //once we know allCards have been fetched we check if the card exists
    if (allCards.length > 0) {
      if (card) {
        effect(card);
      } else {
        throw Error(`Card ${cardId} not found`);
      }
    }
  }, [card, allCards, cardId, effect]);
};
