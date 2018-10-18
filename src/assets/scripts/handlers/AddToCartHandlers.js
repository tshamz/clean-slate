import {
  getState,
  addItem,
  removeItem
} from '@shopify/theme-cart';

import dom from 'core/Dom';
import bva from 'core/Constants';

import { getAlternativeTemplate } from 'core/Helpers';

export const cartError = type => error => {
  PubSub.publish(bva.cartError, { type, error });
};

export const genericCartErrorHandler = ({ type, error }) => {
  alert(`Something went wrong! Please try again.\n\nerror type: ${type}\nerror: ${error}`);
};

export const updateInlineCart = async () => {
  const newCart = await getAlternativeTemplate('cart', 'ajax-inline-cart-contents');
  $(dom.inlineCartContents).html(newCart);
};

export const openInlineCart = () => {
  return new Promise(resolve => {
    $(dom.inlineCart).one('transitionend', () => {
      if ($(dom.inlineCart).is('.is-open')) {
        resolve();
      }
    });
    $(dom.inlineCart).addClass('is-open');
  });
};

export const closeInlineCart = () => {
  return new Promise(resolve => {
    $(dom.inlineCart).one('transitionend', () => {
      if (!$(dom.inlineCart).is('.is-open')) {
        resolve();
      }
    });
    $(dom.inlineCart).removeClass('is-open');
  });
};

export const addItemToCart = async ({ id, ...rest }) => {
  await addItem(id, ...rest);
  return getState();
};

export const addToCartSuccess = cart => {
  PubSub.publish(bva.addToCartSuccess, cart);
};

export const removeItemFromCart = async key => {
  await removeItem(key);
  return getState();
};

export const removeFromCartSuccess = cart => {
  PubSub.publish(bva.removeFromCartSuccess, cart);
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
