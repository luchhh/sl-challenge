import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { client } from "../../../lib/client";
import { Card } from "../types";

const cardsAdapter = createEntityAdapter<Card>({
  selectId: (card) => card._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = cardsAdapter.getInitialState({
  status: "idle",
  error: "",
  filter: "",
});

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const { data } = await client.get("/cards.json");
  return data;
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    filterUpdated(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    cardUpdated: cardsAdapter.updateOne,
    cardRemoved: cardsAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        cardsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { filterUpdated, cardUpdated, cardRemoved } = cardsSlice.actions;
export const fetchCardsFulfilled = fetchCards.fulfilled;

export const {
  selectAll: selectAllCards,
  selectById: selectCardById,
  selectIds: selectCardsIds,
} = cardsAdapter.getSelectors((state: RootState) => state.cards);

export const selectCardsByFilter = createSelector(
  [selectAllCards, (state) => state.cards.filter],
  (cards, filter) => {
    return cards
      .filter((card) => card.name.toUpperCase().includes(filter.toUpperCase()))
      .map((card) => card._id);
  }
);

export default cardsSlice.reducer;
