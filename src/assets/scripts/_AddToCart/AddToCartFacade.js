import { getState, addItem, removeItem, } from '@shopify/theme-cart';

import dom from 'core/Dom';
import bva from 'core/Constants';

import { updateInlineCartUI, openInlineCart, } from 'handlers/InlineCartHandlers';
import { initializeLineItemContainers } from 'containers/_InitContainers';

const cartRequestComplete = async () => {
  const cart = await getState();
  PubSub.publish(bva.cartUpdateComplete, cart)
};

export const addItemToCart = async ({ id, ...rest }) => {
  return addItem(id, ...rest);
};

export const addToCartSuccess = async cart => {
  await updateInlineCartUI();
  initializeLineItemContainers();
  PubSub.publish(bva.openInlineCart, {});
  cartRequestComplete();
};

export const removeItemFromCart = async key => {
  await removeItem(key);
  return getState();
};

export const removeFromCartSuccess = async cart => {
  await updateInlineCartUI();
  initializeLineItemContainers();
  PubSub.publish(bva.openInlineCart, {});
  cartRequestComplete();
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
