import { addItem, removeItem, updateItem } from '@shopify/theme-cart';

import dom from 'common/Dom';
import bva from 'common/Constants';
import { getAlternativeTemplate, debounce } from 'common/Helpers';

const updateInlineCartUI = data => {
  const resource = 'cart';
  const templateName = 'ajax-inline-cart';
  return getAlternativeTemplate({ resource, templateName })
    .then(newCart => $(dom.inlineCartContents).html(newCart));
};

export const cartRequestSuccess = data => {
  updateInlineCartUI()
    .then(() => {
      PubSub.publish(bva.updateCart, {});
      PubSub.publish(bva.openInlineCart, {});
    });
};

export const addToCart = data => {
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

export const removeFromCart = data => {
  const { key } = data;
  const requestData = { key };
  return removeItem(key)
    .then(responseData => {
      PubSub.publish(bva.cartRequestSuccess, { action: 'remove', requestData, responseData });
    })
    .catch(error => {
      PubSub.publish(bva.cartRequestError, { error, requestData });
    });
};

export const updateCart = debounce(data => {
  const { key, quantity } = data;
  const requestData = { key, quantity };
  return updateItem(key, { quantity })
    .then(responseData => {
      PubSub.publish(bva.cartRequestSuccess, { action: 'update', requestData, responseData });
    })
    .catch(error => {
      PubSub.publish(bva.cartRequestError, { error, requestData });
    });
}, 250);
