import bva from 'core/Constants';

import {
  addToCartHandlers,
  removeFromCartHandlers,
  openInlineCartHandlers,
  closeInlineCartHandlers,
} from 'handlers/CartHandlers';

import { updateSelectedVariant } from 'handlers/VariantHandlers';

import { updateOptionGroupContainer, updateInStockOptionValues } from 'handlers/OptionGroupHandlers';
import { updateQuantitySelectContainer } from 'handlers/QuantitySelectHandlers';

PubSub.subscribe(bva.optionValueChange, async (message, { container, ...data }) => {
  console.log(message, data);
  await updateOptionGroupContainer(container, data);
  updateInStockOptionValues(container);
  // updateSelectedVariant(container);
  // check if all options are set
  //   if so, find and update variant id
  // update in stock on other options
  // update in stock on addToCart
  // update slider to specific option value slide

});

PubSub.subscribe(bva.quantityChange, (message, {container, ...data}) => {
  console.log(message, data);
  enoughInStock(container, data.current);
  // check if there's enough in stock
  //   if not display error
  // update input
  updateQuantitySelectContainer(container, data);  // update container state
  // [optional] display message like "only 5 more in stock"
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
