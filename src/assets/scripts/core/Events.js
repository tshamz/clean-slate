import bva from 'core/Constants';

import { enoughInStock } from 'handlers/InventoryHandlers';
import { updateQuantity, updateQuantitySelectUI } from 'handlers/QuantitySelectHandlers';

import {
  updateSelectedOption,
  updateOptionGroupUI,
  updateInStockOptionValues, } from 'handlers/OptionGroupHandlers';

import {
  cartError,
  genericCartErrorHandler,
  updateInlineCart,
  openInlineCart,
  closeInlineCart,
  addItemToCart,
  addToCartSuccess,
  removeItemFromCart,
  removeFromCartSuccess,
  openInlineCartStart,
  closeInlineCartEnd } from 'handlers/AddToCartHandlers';

PubSub.subscribe(bva.quantityChange, (message, { node, quantity }) => {
  console.log(message, { node, quantity });
  return enoughInStock({ node, quantity })  // check if in stock
    .catch(err => console.log(err))  // if not, display error
    .then(updateQuantity)  // update store
    .then(updateQuantitySelectUI)  // update ui
});

PubSub.subscribe(bva.optionValueChange, (message, { node, name, value }) => {
  console.log(message, { name, value });
  return updateSelectedOption({ node, name, value })  // update store
    .then(updateOptionGroupUI)  // update ui
    .then(updateInStockOptionValues)  // update out of stock values
    // .then(updateSelectedVariant(node))  // update selected variant
    // .then()  // update in stock on addToCart
    // .then()  // update slider to specific slide
    .catch(err => console.log(err))
});

PubSub.subscribe(bva.addToCartRequest, (message, { node, ...item }) => {
  console.log(message, item);
  return addItemToCart(item)
    .then(addToCartSuccess)
    .catch(cartError('add to cart request'));
});

PubSub.subscribe(bva.addToCartSuccess, (message, cart) => {
  console.log(message, cart);
  return updateInlineCart()
    .then(openInlineCart)
    .catch(cartError('add to cart success'));
});

PubSub.subscribe(bva.removeFromCartRequest, (message, { key }) => {
  console.log(message, key);
  return removeItemFromCart(key)
    .then(removeFromCartSuccess)
    .catch(cartError('remove from cart request'));
});

PubSub.subscribe(bva.removeFromCartSuccess, (message, cart) => {
  console.log(message, cart);
  return updateInlineCart()
    .then(openInlineCart)
    .catch(cartError('remove from cart success'));
});

PubSub.subscribe(bva.cartError, (message, error) => {
  genericCartErrorHandler(error)
});

PubSub.subscribe(bva.openInlineCart, (message, data) => {
  console.log(message, data);
  // show overlay
  return openInlineCart()
    .then(res => {
      console.log(`openInlineCart done.`);
    });
});

PubSub.subscribe(bva.closeInlineCart, (message, data) => {
  console.log(message, data);
  return closeInlineCart()
    .then(res => {
      console.log(`closeInlineCart done.`);
    });
  // hide overlay
});

// initSession
// add
// update
// remove
// updateSession
//   getExperience
//   updateExperience
// redirecToCartAndOrCheckout
