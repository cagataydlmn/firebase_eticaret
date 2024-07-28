import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const likeItemsSlice = createSlice({
  name: 'likeItems',
  initialState,
  reducers: {
    setLikeItems: (state, action) => {
      state.items = action.payload;
    },
    addLikeItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteLikeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { setLikeItems, addLikeItem, removeLikeItem } = likeItemsSlice.actions;
export default likeItemsSlice.reducer;
