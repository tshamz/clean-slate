import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, set } from 'core/Helpers';

export const getCurrentQuantity = node =>
  get(node, ['store', 'quantity', 'current']);

export const updateQuantity = ({ node, quantity }) => {
  set(node, ['store', 'quantity'], {key: 'current', value: quantity});

  return Promise.resolve({ node, quantity });
};

export const updateQuantitySelectUI = ({ node, quantity }) => {
  const productContainer = get(node, ['node']);
  $(productContainer).find(dom.quantityValue).val(quantity);

  return Promise.resolve(quantity);
};
