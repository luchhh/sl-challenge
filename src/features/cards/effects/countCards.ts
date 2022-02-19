import { takeEvery, call } from "typed-redux-saga";
import { sendEvent } from "../../../common/lib/analytics2";
import { store } from "../../../store";
import { cardRemoved, fetchCardsFulfilled } from "../state/cardsSlice";

function* countCards() {
  yield call(sendEvent, "statistics/count_cards", {
    card_number: store.getState().cards.ids.length,
    card_total: Object.values(store.getState().cards.entities).reduce(
      (sum, card) => sum + (card ? card.count.total : 0),
      0
    ),
  });
}

export function* countCardsSaga() {
  yield takeEvery(fetchCardsFulfilled, countCards);
  yield takeEvery(cardRemoved, countCards);
}
