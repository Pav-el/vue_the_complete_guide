export default {
  addItem(state, newItem) {
    state.cart.items.push(newItem);
  },
  increaseTotal(state, newItemPrice) {
    state.cart.total += newItemPrice;
  },
  increaseQty(state) {
    state.cart.qty++;
  },
  increaseStoredItemQty(state, storedItemIdx) {
    state.cart.items[storedItemIdx].qty++;
  },
  removeItem(state, removedItemIdx) {
    state.cart.items.splice(removedItemIdx, 1);
  },
  decreaseTotal(state, decreaseSumm) {
    state.cart.total -= decreaseSumm;
  },
  decreaseQty(state, qty) {
    state.cart.qty -= qty;
  }
};
