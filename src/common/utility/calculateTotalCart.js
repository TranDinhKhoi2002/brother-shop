export const calculateTotalCart = (cartProducts) => {
  const totalCart = cartProducts.reduce((total, cartProduct) => {
    return total + cartProduct.productId.price * cartProduct.quantity;
  }, 0);
  return totalCart;
};
