import { addItem, removeItem } from '@shopify/theme-cart';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { getAlternativeTemplate } from 'common/Helpers';

const updateInlineCartUI = async data => {
  const resource = 'cart';
  const templateName = 'ajax-inline-cart-contents';
  const newCart = await getAlternativeTemplate({ resource, templateName });
  $(dom.inlineCartContents).html(newCart);
};

export const cartRequestSuccess = async data => {
  await updateInlineCartUI();
  PubSub.publish(bva.updateCart, {});
  PubSub.publish(bva.openInlineCart, {});
};

export const addToCart = async data => {
  const { id, quantity, properties } = data;
  const requestData = { id, quantity, properties };
  return addItem(id, { quantity, properties })
    .then(responseData => {
      PubSub.publish(bva.cartRequestSuccess, { action: 'add', requestData, responseData });
    })
    .catch(error => {
      PubSub.publish(bva.cartRequestError, { error, requestData });
    });
};

export const removeFromCart = async data => {
  const { key } = data;
  const requestData = { key };
  return removeItem(key)
    .then(responseData => {
      PubSub.publish(bva.cartRequestSuccess, { action: 'remove', requestData, responseData });
    })
    .catch(error => {
      PubSub.publish(bva.cartRequestError, { error, requestData });
    })
};


