import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer } from 'core/Helpers';

export const productContainers = new Map();
window.p = productContainers;

export const getProductContainer = node => {
  return (productContainers.has(node))
    ? productContainers.get(node)
    : productContainers.get($(node).closest('[data-product-container]').get(0));
};

export const registerProductContainer = node => {
  const initialState = {
    [bva.handle]: node.dataset.productContainer,
    [bva.variant]: new Map(),
    [bva.optionGroup]: new Map(),
    [bva.price]: new Map(),
    [bva.quantitySelect]: new Map(),
    [bva.addToCart]: new Map(),
    [bva.slider]: new Map(),
  };

  return Promise.resolve(
    registerContainer(node, bva.product, initialState)
  );
};

export const initProductContainers = async () => {
  return Promise.all(
    $(dom.productContainer).get().map(node => registerProductContainer(node))
  );
};
