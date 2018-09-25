import { addItem, addItemFromForm as addItemWithData, removeItem } from '@shopify/theme-cart';

import BVA from 'global/Constants';
import { getAlternativeTemplate } from 'global/Helpers';

const dom = {
  inlineCart: '[data-inline-cart]',
  inlineCartContents: '[data-inline-cart-contents]',
};

const updateInlineCart = async () => {
  const newCart = await getAlternativeTemplate('cart', 'ajax-inline-cart-contents');
  $(dom.inlineCartContents).html(newCart);
}

const addToCartRequestHandler = items => {
  const addActions = items.map(item => addItemWithData(item));
  return Promise.all(addActions);
};

const addToCartSuccessHandler = async results => {
  updateInlineCart();
  return Promise.resolve();
};

const addToCartErrorHandler = error => {
  console.log(error);
  PubSub.publish(BVA.addToCartError, {});
  return Promise.resolve();
};

const removeFromCartRequestHandler = ids => {
  const removeActions = ids.map(id => removeItem(id));
  return Promise.all(removeActions);
};

const removeFromCartSuccessHandler = results => {
  updateInlineCart();
  return Promise.resolve();
};

const removeFromCartErrorHandler = error => {
  console.log(error);
  PubSub.publish(BVA.removeFromCartError, {});
  return Promise.resolve();
};

const openInlineCartStartHandler = () => {
  $(dom.inlineCart).addClass('is-open');
  return Promise.resolve();
};

const openInlineCartEndHandler = () => {
  console.log(`inline cart open done.`);
  return Promise.resolve();
};

const closeInlineCartStartHandler = () => {
  $(dom.inlineCart).removeClass('is-open');
  return Promise.resolve();
};

const closeInlineCartEndHandler = () => {
  console.log(`inline cart close done.`);
  return Promise.resolve();
};

export const removeFromCartHandlers = {
  request: removeFromCartRequestHandler,
  success: removeFromCartSuccessHandler,
  error: removeFromCartErrorHandler,
};

export const addToCartHandlers = {
  request: addToCartRequestHandler,
  success: addToCartSuccessHandler,
  error: addToCartErrorHandler,
};

export const openInlineCartHandlers = {
  start: openInlineCartStartHandler,
  end: openInlineCartEndHandler,
};

export const closeInlineCartHandlers = {
  start: closeInlineCartStartHandler,
  end: closeInlineCartEndHandler,
};

export default {
  addToCartHandlers,
  removeFromCartHandlers,
  openInlineCartHandlers,
  closeInlineCartHandlers,
};


// getCart
// updateNote
// addItem
// addItemFromForm
// removeItem
// changeItem
// saveLocalState
// getLocalState
// cookiesEnabled
