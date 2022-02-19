import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./features/cards/state/cardsSlice";
import createSagaMiddleware from "redux-saga";
import { trackEventSaga } from "./common/effects/trackEvent";
import { countCardsSaga } from "./features/cards/effects/countCards";

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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
