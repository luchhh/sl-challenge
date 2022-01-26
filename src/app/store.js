import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../features/cards/cardsSlice";
import createSagaMiddleware from "redux-saga";
import { trackEventSaga } from "../features/effects/trackEventSaga";
import { countCardsSaga } from "../features/effects/countCards";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(trackEventSaga);
sagaMiddleware.run(countCardsSaga);
