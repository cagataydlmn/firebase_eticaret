import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const basketItemsSlice = createSlice({
  name: 'basketItems',
  initialState,
  reducers: {
    setBasketItems: (state, action) => {
      state.items = action.payload;
    },
    addBasketItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeBasketItems: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { setBasketItems, addBasketItems, removeBasketItems } = basketItemsSlice.actions;
export default basketItemsSlice.reducer;
