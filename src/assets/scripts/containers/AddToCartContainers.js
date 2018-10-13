import dom from 'core/Dom';
import bva from 'core/Constants';
import { registerContainer, updateState } from 'core/Helpers';

import { getSelectedVariant } from 'containers/VariantContainers';
import { getCurrentQuantity } from 'containers/QuantitySelectContainers';

export const addToCartContainers = new Map();
window.a = addToCartContainers;

export const updateAddToCartContainer = (node, data) => {
  if (addToCartContainers.has(node)) {
    return Promise.resolve(
      addToCartContainers
        .set(node, updateState(node, bva.addToCart, data))
        .get(node)
    );
  }
  return Promise.resolve();
};

export const registerAddToCartContainer = node => {
  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    selectedVariant: getSelectedVariant(),
    quantity: getCurrentQuantity(),
    lineItemProperty: {},
  };

  return Promise.resolve(
    registerContainer(node, bva.addToCart, initialState)
  );
};

export const initAddToCartContainers = async () => {
  return Promise.all(
    $(dom.addToCartContainer).get().map(node => registerAddToCartContainer(node))
  );
};
