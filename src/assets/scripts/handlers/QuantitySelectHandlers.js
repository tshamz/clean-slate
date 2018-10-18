import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

export const updateQuantity = ({ node, quantity }) => {
  const store = get(node, 'store');
  store.quantity = quantity;
  return Promise.resolve({ node, quantity });
};

export const updateQuantitySelectUI = ({ node, quantity }) => {
  const productContainer = get(node, 'node');
  $(productContainer).find(dom.quantityValue).val(quantity);
  return Promise.resolve(quantity);
};
