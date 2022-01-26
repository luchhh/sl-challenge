import React from "react";
import { render as testLibraryRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import reducers
import { fetchCards } from "../features/cards/cardsSlice";
import cardsReducer from "../features/cards/cardsSlice";

//custom render function for tests as suggested here
//https://redux.js.org/usage/writing-tests#components

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        cards: cardsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    store.dispatch(fetchCards());
    return <Provider store={store}>{children}</Provider>;
  }
  return testLibraryRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render, userEvent };
