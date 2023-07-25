import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as dataServices from '@/services/dataRequests';
import { RootState } from '../store';
import { Category } from '@/types/category';

const initialState: { categories: Category[] } = {
  categories: [],
};

export const fetchCommonData = createAsyncThunk<any>('data/fetchCommonData', async () => {
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

export const selectCategories = (state: RootState) => state.data?.categories || [];

export default dataSlice.reducer;
