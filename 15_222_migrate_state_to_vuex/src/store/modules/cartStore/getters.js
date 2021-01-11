export default {
  cart(state) {
    return state.cart;
  },
  cartQty(state) {
    return state.cart.qty;
  },
  cartTotal(state) {
    return state.cart.total.toFixed(2);
  }
};
