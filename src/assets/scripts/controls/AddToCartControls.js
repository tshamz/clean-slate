import dom from 'core/Dom';
import bva from 'core/Constants';

import { get } from 'core/Helpers';

export const updateAddToCartContainer = (node, data) => {
  if (addToCartContainers.has(node)) {
    return Promise.resolve(
      addToCartContainers
        .set(node, updateState(node, 'addToCart', data))
        .get(node)
    );
  }
  return Promise.resolve();
};

export const attachAddToCart = node => {
  const productContainerNodes = get(node, 'nodes');
  const addToCartContainers = $(node).find(dom.addToCartControl).get();
  productContainerNodes.addToCart = [ ...addToCartContainers ];
  return Promise.resolve(get(node));
};

export const attachAddToCarts = containers => {
  const nodes = containers.map(container => container.get('node'));
  return Promise.all(nodes.map(node => attachAddToCart(node)));
};
