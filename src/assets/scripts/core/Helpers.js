import bva from 'core/Constants';

import { productContainers } from 'containers/ProductContainers';

import { sliderContainers } from 'containers/SliderContainers';
import { optionGroupContainers } from 'containers/OptionGroupContainers';
import { quantitySelectContainers } from 'containers/QuantitySelectContainers';

import { variantContainers } from 'containers/VariantContainers';
import { addToCartContainers } from 'containers/AddToCartContainers';
import { priceContainers } from 'containers/PriceContainers';

const containers = {
  [bva.product]: productContainers,
  [bva.slider]: sliderContainers,
  [bva.optionGroup]: optionGroupContainers,
  [bva.quantitySelect]: quantitySelectContainers,
  [bva.variant]: variantContainers,
  [bva.addToCart]: addToCartContainers,
  [bva.price]: priceContainers,
};

export const getAlternativeTemplate = async (resource, templateName, json = false) => {
  const url = `/${resource}?view=${templateName}`;
  const options = { credentials: 'include' };
  return await fetch(url, options).then(res => (json) ? res.json() : res.text());
};

export const uniqueValues = array => {
  return [ ...new Set(array)];
};

export const updateState = (node, type, updates) => {
  const state = containers[type].get(node);
  return Object.entries(updates).reduceRight((_, update, index) => state.set(...update), state);
};

export const getContainer = (type, node) => {
  return containers[type].get(node);
};

export const registerContainer = (node, type, { productContainer, ...initialState }) => {
  const container = containers[type];

  if (!container.has(node)) {
    const state = container
      .set(node, new Map([ ...Object.entries(initialState) ]))
      .get(node);
    return (productContainer)
      ? productContainers.get(productContainer).get(type).set(node, state).get(node)
      : state;
  }

  return containers[type].get(node);
};
