import dom from 'core/Dom';
import bva from 'core/Constants';
import { registerContainer } from 'core/Helpers';

export const productContainers = new Map();
window.p = productContainers;

export const getProductContainer = node => {
  if (node) {
    return productContainers.get(node);
  }
  return productContainers;
};

export const updateProductContainer = (node, [type, [dataNode, ref]]) => {
  if (productContainers.has(node)) {
    const productContainer = productContainers.get(node);
    const map = productContainer.get(type);
    map.set(dataNode, ref);
  }
  return Promise.resolve(productContainers);
};

export const registerProductContainer = node => {
  const initialState = {
    'handle': node.dataset.productContainer,
    [bva.slider]: new Map(),
    [bva.quantitySelect]: new Map(),
    [bva.optionGroup]: new Map(),
    [bva.addToCart]: new Map(),
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
