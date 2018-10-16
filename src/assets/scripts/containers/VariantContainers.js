import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer } from 'core/Helpers';

export const variantContainers = new Map();
window.v = variantContainers;

export const getVariantContainer = node => {
  return (variantContainers.has(node))
    ? variantContainers.get(node)
    : variantContainers.get($(node).closest('[data-product-container]').get(0))
};

export const getVariant = (node, variantOptions) => {
  const variantContainer = getVariantContainer(node);
  const optionObject = variantContainer
    .get('options')
    .find(options =>
      Object.entries(options).every(([name, value]) => variantOptions[name] === value));
  return variantContainer.get('variants').get(optionObject) || {};
};

export const registerVariantContainer = node => {
  const productContainer = $(node).closest(dom.productContainer)[0];
  const variantNode = JSON.parse(node.innerHTML);
  const variantContainerData = variantNode.reduce((variantContainerData, { options, ...variant }) => ({
    options: [ ...variantContainerData.options, options ],
    variants: variantContainerData.variants.set(options, { options, ...variant })
  }), { options: [], variants: new Map() });

  const initialState = {
    productContainer,
    ...variantContainerData
  };

  return Promise.resolve(
    registerContainer(productContainer, bva.variant, initialState)
  );
};

export const initVariantContainers = async () => {
  return Promise.all(
    $(dom.variantContainer).get().map(node => registerVariantContainer(node))
  );
};
