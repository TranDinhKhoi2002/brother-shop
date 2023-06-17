import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import dataReducer from './slices/data';
import wishlistReducer from './slices/wishlist';
import promotionsReducer from './slices/promotions';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    data: dataReducer,
    wishlist: wishlistReducer,
    promotions: promotionsReducer,
  },
});

export default store;
