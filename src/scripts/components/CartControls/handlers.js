import { addItem, removeItem } from '@shopify/theme-cart';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { getAlternativeTemplate } from 'common/Helpers';

updateInlineCartUI

const cartRequestComplete = async (action, data) => {
  try {
    const response = await action(data);
    await updateInlineCartUI(response)
    PubSub.publish(bva.openInlineCart, {});

    return response;
  } catch (err) {

  }
};

export const _addToCart = async data => {
  const { id, quantity, properties } = data;
  return addItem(id, { quantity, properties });
};

export const _removeFromCart = async data => {
  const { key } = data;
  return removeItem(key);
};

export const updateInlineCartUI = async data => {
  const resource = 'cart';
  const templateName = 'ajax-inline-cart-contents';
  const newCart = await getAlternativeTemplate({ resource, templateName });

  $(dom.inlineCartContents).html(newCart);

  return data;
};


export const addToCart = data => cartRequestComplete(_addToCart, data);
export const removeFromCart = data => cartRequestComplete(_removeFromCart, data);
