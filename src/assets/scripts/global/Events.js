import BVA from 'scripts/global/Constants';

import {
  addToCartHandlers,
  removeFromCartHandlers,
  openInlineCartHandlers,
  closeInlineCartHandlers,
} from 'components/CartEventHandlers';

import { updateProductContainer } from 'components/ProductContainers';

PubSub.subscribe(BVA.addToCartRequest, async (message, data) => {
  // console.log(message, data);
  return addToCartHandlers.request(data)
    .then(PubSub.publish(BVA.addToCartSuccess, {}))
    .catch(addToCartHandlers.error);
});

PubSub.subscribe(BVA.addToCartSuccess, async (message, data) => {
  // console.log(message, data);
  return addToCartHandlers.request(data)
    .then(addToCartHandlers.success)
    .catch(addToCartHandlers.error);
});

PubSub.subscribe(BVA.removeFromCartRequest, async (message, data) => {
  // console.log(message, data);
  return removeFromCartHandlers.request(data)
    .then(PubSub.publish(BVA.removeFromCartSuccess, {}))
    .catch(removeFromCartHandlers.error);
});

PubSub.subscribe(BVA.openInlineCartStart, async (message, data) => {
  // console.log(message, data);
  return openInlineCartHandlers.start()
});

PubSub.subscribe(BVA.openInlineCartEnd, async (message, data) => {
  // console.log(message, data);
  return openInlineCartHandlers.end()
});

PubSub.subscribe(BVA.closeInlineCartStart, async (message, data) => {
  // console.log(message, data);
  return closeInlineCartHandlers.start()
});

PubSub.subscribe(BVA.closeInlineCartEnd, async (message, data) => {
  // console.log(message, data);
  return closeInlineCartHandlers.end()
});

PubSub.subscribe(BVA.optionValueChange, async (message, data) => {
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
