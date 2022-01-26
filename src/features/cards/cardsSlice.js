import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const cardsAdapter = createEntityAdapter({
  selectId: (card) => card._id,
  sortComparer: (a, b) => b.name.localeCompare(a.name),
});

const initialState = cardsAdapter.getInitialState({
  status: "idle",
  error: null,
  filter: "",
});

//TODO: delete delay to test states
export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const { data } = await axios.get("/cards.json");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    filterUpdated(state, action) {
      state.filter = action.payload;
    },
    cardUpdated(state, action) {},
    cardRemoved(state, action) {},
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

export const { filterUpdated, cardUpdated, cardRemoved } = cardsSlice.actions;
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
