import bva from 'core/Constants';

import {
  addToCartHandlers,
  removeFromCartHandlers,
  openInlineCartHandlers,
  closeInlineCartHandlers,
} from 'handlers/CartHandlers';

import { updateSelectedVariant } from 'handlers/VariantHandlers';

import { updateOptionGroupContainer, updateInStockOptionValues } from 'handlers/OptionGroupHandlers';
import { updateQuantitySelectContainer, updateQuantitySelectUI } from 'handlers/QuantitySelectHandlers';

import { enoughInStock } from 'handlers/InventoryHandlers';


PubSub.subscribe(bva.quantityChange, (message, {node, ...data}) => {
  console.log(message, data);
  return enoughInStock(node, data)  // check if there's enough in stock
    .catch(err => console.log(err))  // if not display error - [optional] display error message
    .then(updateQuantitySelectContainer(node))  // update container
    .then(updateQuantitySelectUI(node))  // update input
});

PubSub.subscribe(bva.optionValueChange, async (message, {node, ...data}) => {
  console.log(message, data);
  return updateOptionGroupContainer(node, data)  // update container
    .then(updateInStockOptionValues(node))  // update in stock on option values
    .then(updateSelectedVariant)  // update selected variant
    // .then()  // update in stock on addToCart
    // .then()  // update slider to specific slide
    .catch(err => console.log(err))
});

PubSub.subscribe(bva.addToCartRequest, (message, {container, ...data}) => {
  console.log(message, data);
  return addToCartHandlers.request(data)
    .then(PubSub.publish(bva.addToCartSuccess, {}))
    .catch(addToCartHandlers.error);
});

PubSub.subscribe(bva.addToCartSuccess, (message, {container, ...data}) => {
  console.log(message, data);
  return addToCartHandlers.request(data)
    .then(addToCartHandlers.success)
    .catch(addToCartHandlers.error);
});

PubSub.subscribe(bva.removeFromCartRequest, (message, {container, ...data}) => {
  console.log(message, data);
  return removeFromCartHandlers.request(data)
    .then(PubSub.publish(bva.removeFromCartSuccess, {}))
    .catch(removeFromCartHandlers.error);
});

PubSub.subscribe(bva.openInlineCartStart, (message, {container, ...data}) => {
  console.log(message, data);
  return openInlineCartHandlers.start();
});

PubSub.subscribe(bva.openInlineCartEnd, (message, {container, ...data}) => {
  console.log(message, data);
  return openInlineCartHandlers.end();
});

PubSub.subscribe(bva.closeInlineCartStart, (message, {container, ...data}) => {
  console.log(message, data);
  return closeInlineCartHandlers.start();
});

PubSub.subscribe(bva.closeInlineCartEnd, (message, {container, ...data}) => {
  console.log(message, data);
  return closeInlineCartHandlers.end();
});


// initSession
// add
// update
// remove
// updateSession
//   getExperience
//   updateExperience
// redirecToCartAndOrCheckout
