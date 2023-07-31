import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as wishlistServices from '@/services/wishlistRequests';
import { RootState } from '../store';
import { WishlistPayload } from '@/services/types/wishlist';

const initialState = {
  products: [],
};

export const fetchAddToWishlist = createAsyncThunk<any, WishlistPayload>(
  'wishlist/fetchAddToWishlist',
  async (product) => {
    const response = await wishlistServices.addProductToWishlist(product);
    return response;
  },
);

export const fetchRemoveFromWishlist = createAsyncThunk<any, WishlistPayload>(
  'wishlist/fetchRemoveFromWishlist',
  async (productId) => {
    const response = await wishlistServices.removeProductFromWishlist(productId);
    return response;
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    assignProductsToWishlist(state, action) {
      const updatedProducts = action.payload.products;
      state.products = updatedProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddToWishlist.fulfilled, (state, { payload }) => {
      const { wishlist, success } = payload;

      if (success) {
        state.products = wishlist;
      }
    });

    builder.addCase(fetchRemoveFromWishlist.fulfilled, (state, { payload }) => {
      const { wishlist, success } = payload;

      if (success) {
        state.products = wishlist;
      }
    });
  },
});

export const selectWishlistProducts = (state: RootState) => state.wishlist.products;

export const { assignProductsToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
