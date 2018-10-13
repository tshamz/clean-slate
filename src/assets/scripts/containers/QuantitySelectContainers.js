import dom from 'core/Dom';
import bva from 'core/Constants';
import { registerContainer, updateState } from 'core/Helpers';

export const quantitySelectContainers = new Map();
window.q = quantitySelectContainers;

export const getCurrentQuantity = container => {
  if (!container) {
    return 0;
  }
  return quantitySelectContainers.get(container).get('quantity');
};

export const updateQuantitySelectContainer = (node, data) => {
  if (quantitySelectContainers.has(node)) {
    return Promise.resolve(
      quantitySelectContainers
        .set(node, updateState(node, bva.quantitySelect, data))
        .get(node)
    );
  }
  return Promise.resolve();
};

export const registerQuantitySelectContainer = node => {
  const initialState = {
    productContainer: $(node).closest(dom.productContainer)[0],
    current: parseInt($(node).find(dom.quantityValue).val(), 10),
    min: $(node).find(dom.quantityValue).get(0).min || 1,
    max: 9999,
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
