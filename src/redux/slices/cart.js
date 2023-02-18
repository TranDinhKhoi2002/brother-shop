import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.products.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size
      );

      if (itemIndex === -1) {
        const product = { ...action.payload, amount: 1 };
        state.products.push(product);
      } else {
        state.products[itemIndex].amount++;
      }

      localStorage.removeItem("products");
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      state.products = state.products.filter(
        (item) =>
          (item.product.id === action.payload.id &&
            item.size !== action.payload.size) ||
          item.product.id !== action.payload.id
      );

      localStorage.removeItem("products");
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    clearCart(state) {
      state.products = [];
      localStorage.removeItem("products");
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateAmountOfProduct(state, action) {
      if (action.payload.amount === "0") {
        state.products = state.products.filter(
          (item) =>
            item.product.id === action.payload.id &&
            item.size !== action.payload.size
        );
      } else {
        const itemIndex = state.products.findIndex(
          (item) =>
            item.product.id === action.payload.id &&
            item.size === action.payload.size
        );

        state.products[itemIndex].amount = +action.payload.amount;
      }

      localStorage.removeItem("products");
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    assignAllProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
