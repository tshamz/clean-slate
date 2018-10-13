import bva from 'core/Constants';

import {
  addToCartHandlers,
  removeFromCartHandlers,
  openInlineCartHandlers,
  closeInlineCartHandlers,
} from 'handlers/CartHandlers';

import { handleOptionChange } from 'handlers/OptionGroupHandlers';
import { handleQuantityChange } from 'handlers/QuantitySelectHandlers';

PubSub.subscribe(bva.optionValueChange, (message, {container, ...data}) => {
  handleOptionChange(container, data);
  // check if all options are set
  //   if so, find and update variant id
  // update in stock on other options
  // update in stock on addToCart
  // update slider to specific option value slide

});

PubSub.subscribe(bva.quantityChange, (message, {container, ...data}) => {
  handleQuantityChange(container, data);
  // update container state
  // check if there's enough in stock
  //   if not display error
  // update input
  // [optional] display message like "only 5 more in stock"
});

PubSub.subscribe(bva.addToCartRequest, (message, {container, ...data}) =>
  addToCartHandlers.request(data)
    .then(PubSub.publish(bva.addToCartSuccess, {}))
    .catch(addToCartHandlers.error));

PubSub.subscribe(bva.addToCartSuccess, (message, {container, ...data}) =>
  addToCartHandlers.request(data)
    .then(addToCartHandlers.success)
    .catch(addToCartHandlers.error));

PubSub.subscribe(bva.removeFromCartRequest, (message, {container, ...data}) =>
  removeFromCartHandlers.request(data)
    .then(PubSub.publish(bva.removeFromCartSuccess, {}))
    .catch(removeFromCartHandlers.error));

PubSub.subscribe(bva.openInlineCartStart, (message, {container, ...data}) =>
  openInlineCartHandlers.start());

PubSub.subscribe(bva.openInlineCartEnd, (message, {container, ...data}) =>
  openInlineCartHandlers.end());

PubSub.subscribe(bva.closeInlineCartStart, (message, {container, ...data}) =>
  closeInlineCartHandlers.start());

PubSub.subscribe(bva.closeInlineCartEnd, (message, {container, ...data}) =>
  closeInlineCartHandlers.end());


// initSession
// add
// update
// remove
// updateSession
//   getExperience
//   updateExperience
// redirecToCartAndOrCheckout
