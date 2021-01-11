export default {
  addProductToCart(context, productData) {
    const productInCartIndex = context.getters.cart.items.findIndex(
      ci => ci.productId === productData.id
    );

    if (productInCartIndex >= 0) {
      context.commit('increaseStoredItemQty', productInCartIndex);
    } else {
      const newItem = {
        productId: productData.id,
        title: productData.title,
        image: productData.image,
        price: productData.price,
        qty: 1
      };
      context.commit('addItem', newItem);
    }
    context.commit('increaseQty');
    context.commit('increaseTotal', productData.price);
  },
  removeProductFromCart(context, prodId) {
    const productInCartIndex = context.getters.cart.items.findIndex(
      cartItem => cartItem.productId === prodId
    );
    const prodData = context.getters.cart.items[productInCartIndex];
    context.commit('removeItem', productInCartIndex);
    context.commit('decreaseQty', prodData.qty);
    context.commit('decreaseTotal', prodData.price * prodData.qty);
  }
};
