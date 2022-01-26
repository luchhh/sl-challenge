import { takeEvery, call } from "redux-saga/effects";
import { sendEvent } from "../../lib/analytics1";

function* trackEvent(action) {
  yield call(
    sendEvent,
    action.payload.eventName,
    action.payload.eventProperties
  );
}

export function* trackEventSaga() {
  yield takeEvery("cards/onClick", trackEvent);
}
