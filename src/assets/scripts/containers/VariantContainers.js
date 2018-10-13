import dom from 'core/Dom';
import bva from 'core/Constants';
import { registerContainer, updateState } from 'core/Helpers';

export const variantContainers = new Map();
window.v = variantContainers;

export const getSelectedVariant = () => {

};

export const getPrice = () => {

  return {
    current: 10.00,
    lowest: 5.00,
    highest: 20.00,
  };
};

export const updateVariantContainer = (node, data) => {
  if (variantContainers.has(node)) {
    return Promise.resolve(
      variantContainers
        .set(node, updateState(node, bva.variant, data))
        .get(node)
    );
  }
  return Promise.resolve();
};

export const registerVariantContainer = node => {
  const productContainer = $(node).closest(dom.productContainer)[0];
  const initialState = {
    productContainer,
    ...JSON.parse(node.innerHTML)
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
