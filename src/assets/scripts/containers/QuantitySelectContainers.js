import dom from 'core/Dom';
import bva from 'core/Constants';

import { registerContainer } from 'core/Helpers';

export const quantitySelectContainers = new Map();
window.q = quantitySelectContainers;

export const getCurrentQuantity = node =>
  quantitySelectContainers.get(node).get('quantity') || undefined;

export const registerQuantitySelectContainer = node => {
  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    quantity: parseInt($(node).find(dom.quantityValue).val(), 10),
    min: 1,
  };

  return Promise.resolve(
    registerContainer(node, bva.quantitySelect, initialState)
  );
};

export const initQuantitySelectContainers = async () => {
  return Promise.all(
    $(dom.quantitySelectContainer).get().map(node => registerQuantitySelectContainer(node))
  );
};
