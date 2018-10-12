import bva from 'core/Constants';

import {
  addToCartHandlers,
  removeFromCartHandlers,
  openInlineCartHandlers,
  closeInlineCartHandlers,
} from 'handlers/CartHandlers';

import { updateProductContainer } from 'containers/ProductContainers';

import {
  handleQuantityChange,
} from 'handlers/QuantitySelectHandlers';

// PubSub.subscribe(bva.quantityChange, (message, { container, quantity }) => {
PubSub.subscribe(bva.quantityChange, (message, {container, ...data}) => {
  // handleQuantityChange(container, quantity);
  handleQuantityChange(container, data);
});


PubSub.subscribe(bva.addToCartRequest, async (message, data) => {
  // console.log(message, data);
  return addToCartHandlers.request(data)
    .then(PubSub.publish(bva.addToCartSuccess, {}))
    .catch(addToCartHandlers.error);
});

PubSub.subscribe(bva.addToCartSuccess, async (message, data) => {
  // console.log(message, data);
  return addToCartHandlers.request(data)
    .then(addToCartHandlers.success)
    .catch(addToCartHandlers.error);
});

PubSub.subscribe(bva.removeFromCartRequest, async (message, data) => {
  // console.log(message, data);
  return removeFromCartHandlers.request(data)
    .then(PubSub.publish(bva.removeFromCartSuccess, {}))
    .catch(removeFromCartHandlers.error);
});

PubSub.subscribe(bva.openInlineCartStart, async (message, data) => {
  // console.log(message, data);
  return openInlineCartHandlers.start()
});

PubSub.subscribe(bva.openInlineCartEnd, async (message, data) => {
  // console.log(message, data);
  return openInlineCartHandlers.end()
});

PubSub.subscribe(bva.closeInlineCartStart, async (message, data) => {
  // console.log(message, data);
  return closeInlineCartHandlers.start()
});

PubSub.subscribe(bva.closeInlineCartEnd, async (message, data) => {
  // console.log(message, data);
  return closeInlineCartHandlers.end()
});

PubSub.subscribe(bva.optionValueChange, async (message, data) => {
  console.log(message, data);
  const { node, name, value } = data;
  return updateProductContainer(node, { [name]: value} )
    .then(node => {
      console.log(node);
      return node;
    })
});


// initSession
// add
// update
// remove
// updateSession
//   getExperience
//   updateExperience
// redirecToCartAndOrCheckout
