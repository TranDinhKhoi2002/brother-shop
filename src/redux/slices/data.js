import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as dataServices from '@/services/dataRequests';

const initialState = {
  categories: [],
};

export const fetchCommonData = createAsyncThunk('data/fetchCommonData', async () => {
  const response = await dataServices.getCommonData();
  return response;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommonData.fulfilled, (state, { payload }) => {
      const { categories } = payload;
      state.categories = categories;
    });
  },
});

export const { setData } = dataSlice.actions;

export const selectCategories = (state) => state.data?.categories || [];

export default dataSlice.reducer;
