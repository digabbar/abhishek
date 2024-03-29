import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    shippingInfo: {},
    success: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.product === action.payload.product
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product === action.payload);
      if (item.quantity >= item.stock) return;
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.product === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.product !== action.payload
      );
      state.cart = removeItem;
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      state.success = true;
    },

    reset: (state, action) => {
      state.success = false;
    },
    deleteCartData: (state, action) => {
      state.cart = [];
      state.shippingInfo = {};
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  saveShippingInfo,
  reset,
  deleteCartData,
} = cartSlice.actions;
