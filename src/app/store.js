import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../features/cards/cardsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
