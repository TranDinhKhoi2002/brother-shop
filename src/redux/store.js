import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import dataReducer from './slices/data';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    data: dataReducer,
  },
});

export default store;
