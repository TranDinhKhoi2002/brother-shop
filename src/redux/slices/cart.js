import {
  addToCart as addToCartApi,
  updateQuantity,
  removeItemsFromCart,
  checkoutCart,
  createReceipt,
} from '@/services/cartRequests';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  products:
    typeof window !== 'undefined' && localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`)
      ? JSON.parse(localStorage.getItem(`cart-${localStorage.getItem('sessionID')}`))
      : [],
};

export const fetchAddToCart = createAsyncThunk('cart/fetchAddToCart', async (itemData) => {
  const response = await addToCartApi(itemData);
  return response;
});

export const fetchUpdateQuantity = createAsyncThunk('cart/fetchUpdateQuantity', async (itemData) => {
  const response = await updateQuantity(itemData);
  return response;
});

export const fetchRemoveItemsFromCart = createAsyncThunk('cart/fetchRemoveItemsFromCart', async (itemsData) => {
  const response = await removeItemsFromCart(itemsData);
  return response;
});

export const fetchCheckoutCart = createAsyncThunk('cart/fetchCheckoutCart', async () => {
  const response = await checkoutCart();
  return response;
});

export const fetchCreateReceipt = createAsyncThunk('cart/fetchCreateReceipt', async (receipt) => {
  const response = await createReceipt(receipt);
  return response;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, size, quantity } = action.payload;

      let sessionID = localStorage.getItem('sessionID');
      if (!sessionID) {
        sessionID = uuidv4();
        localStorage.setItem('sessionID', sessionID);
      }

      const itemIndex = state.products.findIndex((item) => item.productId._id === productId._id && item.size === size);

      if (itemIndex === -1) {
        const product = { ...action.payload };
        state.products.push(product);
      } else {
        state.products[itemIndex].quantity += quantity;
      }

      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      console.log(action.payload);
      state.products = state.products.filter(
        (item) =>
          (item.productId._id === action.payload.id && item.size !== action.payload.size) ||
          item.productId._id !== action.payload.id,
      );

      const sessionID = localStorage.getItem('sessionID');
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    checkOut(state) {
      state.products = [];
      const sessionID = localStorage.getItem('sessionID');
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    updateAmountOfProduct(state, action) {
      if (action.payload.quantity === 0) {
        state.products = state.products.filter(
          (item) => item.productId._id === action.payload.id && item.size !== action.payload.size,
        );
      } else {
        const itemIndex = state.products.findIndex(
          (item) => item.productId._id === action.payload.id && item.size === action.payload.size,
        );

        state.products[itemIndex].quantity = action.payload.quantity;
      }

      const sessionID = localStorage.getItem('sessionID');
      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(state.products));
    },
    assignProductsToCart(state, action) {
      const { cart } = action.payload;
      state.products = cart;

      let sessionID = localStorage.getItem('sessionID');
      if (!sessionID) {
        sessionID = uuidv4();
        localStorage.setItem('sessionID', sessionID);
      }

      localStorage.setItem(`cart-${sessionID}`, JSON.stringify(cart));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddToCart.fulfilled, (state, { payload }) => {
      const { success, cart } = payload;

      if (success) {
        state.products = cart;
      }
    });
    builder.addCase(fetchUpdateQuantity.fulfilled, (state, { payload }) => {
      const { success, cart } = payload;

      if (success) {
        state.products = cart;
      }
    });
    builder.addCase(fetchRemoveItemsFromCart.fulfilled, (state, { payload }) => {
      const { success, cart } = payload;

      if (success) {
        state.products = cart;
      }
    });
    builder.addCase(fetchCheckoutCart.fulfilled, (state, { payload }) => {
      const { success } = payload;

      if (success) {
        state.products = [];
      }
    });
  },
});

export const { addToCart, removeFromCart, checkOut, updateAmountOfProduct, assignProductsToCart } = cartSlice.actions;

export const selectCartProducts = (state) => state.cart.products;

export default cartSlice.reducer;
