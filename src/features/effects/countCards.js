import { takeEvery, call } from "redux-saga/effects";
import { sendEvent } from "../../lib/analytics2";
import { store } from "../../app/store";

function* countCards(action) {
  yield call(sendEvent, "statistics/count_cards", {
    card_number: store.getState().cards.ids.length,
    card_total: Object.values(store.getState().cards.entities).reduce(
      (sum, card) => sum + card.count.total,
      0
    ),
  });
}

export function* countCardsSaga() {
  yield takeEvery("cards/fetchCards/fulfilled", countCards);
  yield takeEvery("cards/cardRemoved", countCards);
}
