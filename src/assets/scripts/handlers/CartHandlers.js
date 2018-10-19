import {
  getState,
  addItem,
  removeItem
} from '@shopify/theme-cart';

import dom from 'core/Dom';
import bva from 'core/Constants';

import { getAlternativeTemplate } from 'core/Helpers';

import { initializeProductContainer } from 'containers/_InitContainers';
import { registerProductContainers } from 'containers/ProductContainers';

export const updateInlineCartUI = async () => {
  const newCart = await getAlternativeTemplate('cart', 'ajax-cart-contents');
  $(dom.inlineCartContents).html(newCart);
  return $(dom.inlineCart).find(dom.productContainer).get();
};

export const reRegisterLineItems = nodes => {
  return Promise.all(
    nodes.map(node => initializeProductContainer(node))
  );
};

const inlineCartActionEnd = (action, resolve) => {
  $(dom.inlineCart).one('transitionend', () => {
    if (action === 'open' && $(dom.inlineCart).is('.is-open')) {
      resolve();
    } else if (action === 'close' && !$(dom.inlineCart).is('.is-open')) {
      resolve();
    }
  });
};

export const openInlineCart = () => {
  return new Promise(resolve => {
    inlineCartActionEnd('open', resolve);
    $(dom.inlineCart).addClass('is-open');
  });
};

export const closeInlineCart = () => {
  return new Promise(resolve => {
    inlineCartActionEnd('close', resolve);
    $(dom.inlineCart).removeClass('is-open');
  });
};



export const addItemToCart = async ({ id, ...rest }) => {
  console.log(rest);
  return addItem(id, ...rest);
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



export const cartError = type => error =>
  PubSub.publish(bva.cartError, { type, error });

export const genericCartErrorHandler = ({ type, error }) =>
  alert(`Something went wrong! Please try again.\n\ntype: ${type}\nerror: ${error}`);

// getCart
// updateNote
// addItem
// addItemFromForm
// removeItem
// changeItem
// saveLocalState
// getLocalState
// cookiesEnabled
