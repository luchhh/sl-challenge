import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../lib/client";

const cardsAdapter = createEntityAdapter({
  selectId: (card) => card._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = cardsAdapter.getInitialState({
  status: "idle",
  error: null,
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
    filterUpdated(state, action) {
      state.filter = action.payload;
    },
    cardUpdated: cardsAdapter.updateOne,
    cardRemoved: cardsAdapter.removeOne,
    onClick: (state, action) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        cardsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterUpdated, cardUpdated, cardRemoved, onClick } =
  cardsSlice.actions;
export default cardsSlice.reducer;

export const {
  selectAll: selectAllCards,
  selectById: selectCardById,
  selectIds: selectCardsIds,
} = cardsAdapter.getSelectors((state) => state.cards);

export const selectCardsByFilter = createSelector(
  [selectAllCards, (state) => state.cards.filter],
  (cards, filter) => {
    return cards
      .filter((card) => card.name.toUpperCase().includes(filter.toUpperCase()))
      .map((card) => card._id);
  }
);
