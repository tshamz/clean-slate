import bva from 'core/Constants';

import {
  cartError,
  genericCartErrorHandler,
  addItemToCart,
  addToCartSuccess,
  removeItemFromCart,
  removeFromCartSuccess, } from 'handlers/AddToCartHandlers';

import {
  updateInlineCartUI,
  openInlineCart, } from 'handlers/InlineCartHandlers';

PubSub.subscribe(bva.addToCartRequest, (message, { node, ...item }) => {
  return addItemToCart(item)
    .then(addToCartSuccess)
    .catch(cartError('add to cart request'));
});

PubSub.subscribe(bva.removeFromCartRequest, (message, { key }) => {
  return removeItemFromCart(key)
    .then(removeFromCartSuccess)
    .catch(cartError('remove from cart request'));
});

PubSub.subscribe(bva.cartError, (message, error) => {
  genericCartErrorHandler(error)
});
