import { takeEvery, call } from "typed-redux-saga";
import { sendEvent, SendEventProps } from "../lib/analytics1";
import { PayloadAction } from "@reduxjs/toolkit";
import { buttonClicked } from "../state/buttonClickedAction";

function* trackEvent(action: PayloadAction<SendEventProps>) {
  yield call(sendEvent, {
    eventName: action.payload.eventName,
    eventProperties: action.payload.eventProperties,
  });
}

export function* trackEventSaga() {
  yield takeEvery(buttonClicked, trackEvent);
}
