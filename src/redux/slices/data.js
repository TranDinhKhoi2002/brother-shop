import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      const { categories } = action.payload;

      state.categories = categories;
    },
  },
});

export const { setData } = dataSlice.actions;

export const selectCategories = (state) => state.data.categories;

export default dataSlice.reducer;
