import React from "react";
import {
  render as testLibraryRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import reducers
import { fetchCards } from "../features/cards/state/cardsSlice";
import cardsReducer from "../features/cards/state/cardsSlice";
import { RootState } from "../store";

//custom render function for tests as suggested here
//https://redux.js.org/usage/writing-tests#components

type WrapperProps = { children?: React.ReactNode };
type CustomRenderOptions = {
  preloadedState?: RootState;
  renderOptions?: Omit<RenderOptions, "wrapper">;
};

function render(
  ui: React.ReactElement,
  { preloadedState, ...renderOptions }: CustomRenderOptions = {}
): RenderResult {
  const store = configureStore({
    reducer: {
      cards: cardsReducer,
    },
    preloadedState,
  });
  store.dispatch(fetchCards());

  const Wrapper = ({ children }: WrapperProps) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return testLibraryRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render, userEvent };
