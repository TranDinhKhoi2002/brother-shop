import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as promotionServices from '@/services/promotionRequests';

const initialState = {
  promotions: [],
  loading: false,
};

export const fetchSavePromotion = createAsyncThunk('promotions/fetchSavePromotion', async (data) => {
  const response = await promotionServices.savePromotion(data);
  return response;
});

export const fetchRemovePromotion = createAsyncThunk('promotions/fetchRemovePromotion', async (promotionId) => {
  const response = await promotionServices.removePromotion(promotionId);
  return response;
});

export const fetchUpdatePromotionQuantity = createAsyncThunk(
  'promotions/fetchUpdatePromotionQuantity',
  async (promotionId) => {
    const response = await promotionServices.updatePromotionQuantity(promotionId);
    return response;
  },
);

const promotionSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    addPromotion: (state, action) => {
      const promotion = action.payload.promotion;
      state.promotions.push(promotion);
    },
    removePromotion: (state, action) => {
      const promotionId = action.payload.promotionId;
      const updatedPromotions = state.promotions.filter((promotion) => promotion._id.toString() !== promotionId);
      state.promotions = updatedPromotions;
    },
    assignPromotions: (state, action) => {
      const promotions = action.payload.promotions;
      state.promotions = [...promotions];
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchSavePromotion.fulfilled, (state, { payload }) => {
      const { promotion, success } = payload;

      if (success) {
        state.promotions.push(promotion);
      }
    });

    builders.addCase(fetchRemovePromotion.fulfilled, (state, { payload }) => {
      const { updatedPromotions, success } = payload;

      if (success) {
        state.promotions = updatedPromotions;
      }
    });

    builders.addCase(fetchUpdatePromotionQuantity.fulfilled, (state, { payload }) => {
      const { updatedPromotion, success } = payload;

      if (success) {
        const existingPromotionIndex = state.promotions.findIndex(
          (promotion) => promotion._id.toString() === updatedPromotion._id.toString(),
        );
        state.promotions[existingPromotionIndex] = updatedPromotion;
      }
    });
  },
});

export const { addPromotion, removePromotion, assignPromotions } = promotionSlice.actions;

export const selectPromotions = (state) => state.promotions.promotions;
export const selectPromotionLoading = (state) => state.promotions.loading;

export default promotionSlice.reducer;
