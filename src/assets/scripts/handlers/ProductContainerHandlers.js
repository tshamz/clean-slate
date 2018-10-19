import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

import { getSelectedOptions } from 'handlers/OptionGroupHandlers';
import { getCurrentQuantity } from 'handlers/QuantitySelectHandlers';

export const getVariant = (node, options) => {
  const variantStore = get(node, ['store', 'variant']);
  const matchingOption = variantStore.variantOptions
    .find(option => Object.entries(option).every(([ name, value ]) => options[name] === value));

  return variantStore.variants.get(matchingOption);
};

export const getSelectedVariant = node => {
  const selectedOptions = get(node, ['store', 'option', 'selected']);

  return getVariant(node, selectedOptions);
};

export const getAddToCartDetails = node => {
  const { id } = getSelectedVariant(node);
  const quantity = getCurrentQuantity(node);

  // return Promise.resolve({ id, quantity });
  return { id, quantity };
};

export const updateSelectedVariant = node => {
  const selectedOptions = getSelectedOptions(node);
  const variantStore = get(node, ['store', 'variant']);
  const variant = getVariant(node, selectedOptions);

  return updateStore(node, 'variant', 'selected', variant);
};

export const updateStore = (node, store, property, value) => {
  const targetStore = get(node, ['store', store]);
  targetStore[property] = value;

  return Promise.resolve(node);
};
